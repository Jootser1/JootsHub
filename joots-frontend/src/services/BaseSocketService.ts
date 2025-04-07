import { io, Socket } from 'socket.io-client';
import { logger } from '@/utils/logger';
import { Message as ChatMessage, MessageStatus, MessageType } from '@/types/chat';
import { UserStatusChange, SocketMessage, TypingStatus } from '@/types/socket';

export abstract class BaseSocketService {
  protected socket: Socket | null = null;
  protected userId: string | null = null;
  protected token: string | null = null;
  protected namespace: string;
  protected connectionListeners: Set<(status: boolean) => void> = new Set();
  protected reconnectTimer: NodeJS.Timeout | null = null;
  
  constructor(namespace: string) {
    this.namespace = namespace;
  }
  
  connect(userId: string, token: string): void {
    logger.info(`Tentative de connexion ${this.namespace} pour l'utilisateur ${userId}`);
    
    this.userId = userId;
    this.token = token;
    
    this.closeExistingConnection();
    
    const BASE_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';
    
    this.socket = io(`${BASE_URL}/${this.namespace}`, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
      auth: { userId, token },
      transports: ['websocket', 'polling']
    });
    
    this.setupEventListeners();
  }
  
  disconnect(): void {
    this.closeExistingConnection();
    this.connectionListeners.clear();
  }
  
  protected closeExistingConnection(): void {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }
    
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }
  
  protected setupEventListeners(): void {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      logger.info(`Socket ${this.namespace} connecté`);
      this.notifyConnectionChange(true);
    });
    
    this.socket.on('disconnect', (reason) => {
      logger.warn(`Socket ${this.namespace} déconnecté: ${reason}`);
      this.notifyConnectionChange(false);
    });
    
    this.socket.on('connect_error', (error) => {
      logger.error(`Erreur de connexion ${this.namespace}: ${error.message}`);
      this.scheduleReconnect();
    });

    this.socket.on('ping', () => {
      this.socket?.emit('pong');
    });
  }
  
  protected scheduleReconnect(): void {
    if (this.reconnectTimer) return;
    
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      // La reconnexion est gérée automatiquement par Socket.IO
    }, 5000);
  }
  
  onConnectionChange(callback: (status: boolean) => void): () => void {
    this.connectionListeners.add(callback);
    return () => {
      this.connectionListeners.delete(callback);
    };
  }
  
  protected notifyConnectionChange(status: boolean): void {
    this.connectionListeners.forEach(listener => listener(status));
  }
  
  isConnected(): boolean {
    return !!this.socket?.connected;
  }

  // Méthodes communes pour la gestion des événements
  protected emit(event: string, data?: any): void {
    if (!this.socket?.connected) {
      logger.warn(`Impossible d'émettre l'événement ${event}: non connecté`);
      return;
    }
    this.socket.emit(event, data);
  }

  protected on(event: string, callback: (data: any) => void): () => void {
    if (!this.socket) return () => {};
    
    this.socket.on(event, callback);
    return () => {
      this.socket?.off(event, callback);
    };
  }

  // Getters
  getSocket(): Socket | null {
    return this.socket;
  }
}
