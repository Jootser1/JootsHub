import { io, Socket } from 'socket.io-client';
import { logger } from '@/utils/logger';
import { Message as ChatMessage, MessageStatus, MessageType } from '@/types/chat';
import { UserStatusChange, SocketMessage, TypingStatus } from '@/types/socket';

//const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';
const baseSocketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';
const SOCKET_URL = baseSocketUrl.endsWith('/users') ? baseSocketUrl : `${baseSocketUrl}/users`;
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 1000;
const HEARTBEAT_INTERVAL = 30000;
const CONNECTION_TIMEOUT = 10000;

type ConnectionCallback = (status: boolean) => void;

/**
 * Service de gestion des connexions socket.
 * Ce service est responsable de :
 * - L'établissement et la maintenance de la connexion socket
 * - L'émission et la réception des événements socket
 * - La gestion des événements de base (connexion, déconnexion, erreurs)
 * 
 * Les méthodes spécifiques aux conversations sont implémentées ici
 * pour maintenir une couche d'abstraction propre entre la communication
 * socket et la logique métier de l'application.
 */
class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private reconnectAttempts: number = 0;
  private initialized: boolean = false;
  private connectionCallbacks: Set<ConnectionCallback> = new Set();
  private autoReconnect: boolean = true;
  private userId: string | null = null;
  private accessToken: string | null = null;

  private constructor() {}

  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  initialize(userId: string, accessToken: string): void {
    if (this.initialized && this.socket?.connected) {
      logger.warn('Socket déjà initialisé et connecté');
      return;
    }

    this.userId = userId;
    this.accessToken = accessToken;
    this.initialized = true;
    this.autoReconnect = true;
    
    logger.info(`Initialisation du socket pour l'utilisateur ${userId} vers ${SOCKET_URL}`);

    try {
      if (this.socket) {
        this.socket.close();
      }

      this.socket = io(SOCKET_URL, {
        auth: {
          userId,
          token: accessToken
        },
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: MAX_RECONNECT_ATTEMPTS,
        reconnectionDelay: RECONNECT_DELAY,
        timeout: CONNECTION_TIMEOUT,
        forceNew: true,
        autoConnect: true,
        withCredentials: true
      });

      this.setupEventListeners();
      this.notifyConnectionStatus(false);
    } catch (error) {
      this.initialized = false;
      logger.error('Erreur lors de l\'initialisation du socket:', error);
      throw error;
    }
  }

  private setupEventListeners(): void {
    if (!this.socket) {
      logger.error('Impossible de configurer les écouteurs d\'événements: socket non initialisé');
      return;
    }

    this.socket.on('connect', () => {
      logger.info(`Socket connecté avec ID: ${this.socket?.id}`);
      this.reconnectAttempts = 0;
      this.notifyConnectionStatus(true);
      this.startHeartbeat();
    });

    this.socket.on('disconnect', (reason: string) => {
      logger.info(`Socket déconnecté. Raison: ${reason}`);
      this.notifyConnectionStatus(false);
      this.stopHeartbeat();

      if (this.autoReconnect && this.reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
        this.reconnectAttempts++;
        logger.info(`Tentative de reconnexion #${this.reconnectAttempts}`);
        setTimeout(() => {
          if (this.userId && this.accessToken) {
            this.initialize(this.userId, this.accessToken);
          }
        }, RECONNECT_DELAY * this.reconnectAttempts);
      }
    });

    this.socket.on('connect_error', (error) => {
      logger.error(`Erreur de connexion socket: ${error.message}`, error);
      this.notifyConnectionStatus(false);
      
      if (this.reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
        logger.warn(`Nombre maximum de tentatives de reconnexion atteint (${MAX_RECONNECT_ATTEMPTS})`);
        this.autoReconnect = false;
      }
    });

    this.socket.on('error', (error: Error) => {
      logger.error('Erreur Socket:', error);
      this.notifyConnectionStatus(false);
    });

    this.socket.on('userStatusChange', (data: UserStatusChange) => {
      const eventType = data.eventType === 'connection' ? 'connexion' : 'déconnexion';
      logger.debug(`[SocketService] ${eventType} de l'utilisateur ${data.username || data.userId} (${data.timestamp})`);
    });
  }

  private startHeartbeat(): void {
    this.stopHeartbeat();

    this.heartbeatInterval = setInterval(() => {
      if (this.socket?.connected) {
        this.socket.emit('heartbeat');
        logger.debug('Heartbeat envoyé');
      } else {
        logger.warn('Socket non connecté lors de la tentative d\'envoi du heartbeat');
        this.stopHeartbeat();
      }
    }, HEARTBEAT_INTERVAL);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  private notifyConnectionStatus(connected: boolean): void {
    this.connectionCallbacks.forEach(callback => callback(connected));
  }

  onConnectionChange(callback: ConnectionCallback): () => void {
    this.connectionCallbacks.add(callback);
    // Retourner une fonction de nettoyage
    return () => this.connectionCallbacks.delete(callback);
  }

  // Méthodes pour la gestion des conversations
  joinConversation(conversationId: string): void {
    if (!this.socket?.connected) {
      logger.warn(`Impossible de rejoindre la conversation ${conversationId}: socket non connecté`);
      return;
    }
    this.socket.emit('joinConversation', conversationId);
    logger.debug(`Conversation rejointe: ${conversationId}`);
  }

  leaveConversation(conversationId: string): void {
    if (!this.socket?.connected) {
      logger.warn(`Impossible de quitter la conversation ${conversationId}: socket non connecté`);
      return;
    }
    this.socket.emit('leaveConversation', conversationId);
    logger.debug(`Conversation quittée: ${conversationId}`);
  }

  sendMessage(conversationId: string, content: string): void {
    if (!this.socket?.connected) return;
    this.socket.emit('sendMessage', { conversationId, content });
  }

  sendTypingStatus(conversationId: string, isTyping: boolean): void {
    if (!this.socket?.connected) return;
    this.socket.emit('typingStatus', { conversationId, isTyping });
  }

  markMessageAsRead(messageId: string, conversationId: string): void {
    if (!this.socket?.connected) return;
    this.socket.emit('markMessageAsRead', { messageId, conversationId });
  }

  sendIcebreakerReady(conversationId: string): void {
    if (!this.socket?.connected) return;
    this.socket.emit('icebreakerReady', conversationId);
  }

  sendIcebreakerResponse(conversationId: string, response: any): void {
    if (!this.socket?.connected) return;
    this.socket.emit('icebreakerResponse', { conversationId, response });
  }

  // Gestionnaires d'événements
  onUserStatusChange(callback: (data: UserStatusChange) => void): void {
    if (!this.socket) return;
    this.socket.on('userStatusChange', callback);
  }

  onNewMessage(callback: (message: SocketMessage) => void): void {
    if (!this.socket) return;
    this.socket.on('newMessage', callback);
  }

  onTypingStatus(callback: (data: TypingStatus) => void): void {
    if (!this.socket) return;
    this.socket.on('typingStatus', callback);
  }

  onMessageRead(callback: (data: { messageId: string; conversationId: string }) => void): void {
    if (!this.socket) return;
    this.socket.on('messageRead', callback);
  }

  // Nettoyage
  disconnect(): void {
    this.autoReconnect = false;
    this.stopHeartbeat();
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.initialized = false;
    this.userId = null;
    this.accessToken = null;
    this.notifyConnectionStatus(false);
  }

  // Getters
  getSocket(): Socket | null {
    return this.socket;
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export default SocketService; 