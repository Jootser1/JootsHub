import { io, Socket } from 'socket.io-client'
import { logger } from '@/utils/logger'

type EventCallback = (data: unknown) => void

interface SocketEvent {
  eventName: string
  callback: EventCallback
}

export abstract class BaseSocketService {
  protected socket: Socket | null = null
  protected userId: string | null = null
  protected token: string | null = null
  protected namespace: string
  protected connectionListeners: Set<(status: boolean) => void> = new Set()
  protected reconnectTimer: NodeJS.Timeout | null = null

  constructor(namespace: string) {
    this.namespace = namespace
  }

  connect(userId: string, token: string): void {
    if (this.socket && this.socket.connected) {
      logger.info(`BaseSocketService: Socket déjà connecté pour ${this.namespace}`)
      return
    }

    this.userId = userId
    this.token = token

    if (this.socket && !this.socket.connected) {
      this.socket.removeAllListeners()
      this.socket = null
    }

    const BASE_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'https://localhost'

    this.socket = io(`${BASE_URL}/${this.namespace}`, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
      auth: { userId, token },
      transports: ['websocket', 'polling'],
    })
    this.setupEventListeners()
  }

  disconnect(): void {
    this.closeExistingSocketConnection()
    this.connectionListeners.clear()
  }

  protected closeExistingSocketConnection(): void {
    if (this.socket) {
      this.socket.removeAllListeners()
      this.socket.disconnect()
      this.socket = null
    }

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer)
      this.reconnectTimer = null
    }
  }

  protected setupEventListeners(): void {
    if (!this.socket) return

    this.socket.on('connect', () => {
      logger.info(`[Socket ${this.namespace}] connecté pour userId: ${this.userId}`)
    })

    this.socket.on('disconnect', reason => {
      logger.warn(`Socket ${this.namespace} déconnecté: ${reason}`)
    })

    this.socket.on('connect_error', error => {
      logger.error(`Erreur de connexion ${this.namespace}: ${error.message}`)
      this.scheduleReconnect()
    })

    this.socket.on('ping', () => {
      this.socket?.emit('pong')
    })
  }

  protected scheduleReconnect(): void {
    if (this.reconnectTimer) return

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null
      // La reconnexion est gérée automatiquement par Socket.IO
    }, 5000)
  }

  isConnected(): boolean {
    return !!this.socket?.connected
  }

  // Méthodes communes pour la gestion des événements
  protected emit(event: string, data?: unknown): void {
    if (!this.socket?.connected) {
      logger.warn(`Impossible d'émettre l'événement ${event}: non connecté`)
      return
    }
    this.socket.emit(event, data)
  }

  protected onEvent<T>(eventName: string, callback: (data: T) => void): () => void {
    if (!this.socket) return () => {}

    this.socket.on(eventName, data => {
      // La variable userInfo était définie mais non utilisée
      // const userInfo = data.user ? ` (${data.user.username})` : ''
      //logger.debug(`BaseSocketService: Événement ${eventName} reçu${userInfo}:`, data)
      callback(data)
    })

    return () => {
      this.socket?.off(eventName, callback)
    }
  }

  protected registerSocketEvents(socket: Socket, events: SocketEvent[]) {
    events.forEach(({ eventName, callback }) => {
      socket.on(eventName, callback)
    })
  }

  protected unregisterSocketEvents(socket: Socket, events: SocketEvent[]) {
    events.forEach(({ eventName, callback }) => {
      socket.off(eventName, callback)
    })
  }

  // Getters
  getSocket(): Socket | null {
    return this.socket
  }

  getUserId(): string | null {
    return this.userId
  }

  get connected(): boolean {
    return this.isConnected()
  }
}
