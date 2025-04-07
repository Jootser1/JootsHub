import { BaseSocketService } from './BaseSocketService';
import { logger } from '@/utils/logger';
import { io, Socket } from 'socket.io-client';

type ConnectionListener = (status: boolean) => void;

export class ChatSocketService extends BaseSocketService {
  private static instance: ChatSocketService;
  
  private constructor() {
    super('chat');
  }
  
  static getInstance(): ChatSocketService {
    if (!ChatSocketService.instance) {
      ChatSocketService.instance = new ChatSocketService();
    }
    return ChatSocketService.instance;
  }
  
  connect(userId: string, token: string): void {
    if (this.socket?.connected) {
      logger.debug('ChatSocketService: déjà connecté');
      return;
    }
    
    logger.info(`ChatSocketService: tentative de connexion pour l'utilisateur ${userId}`);
    
    this.userId = userId;
    this.token = token;
    
    this.closeExistingConnection();
    
    const BASE_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';
    
    this.socket = io(`${BASE_URL}/chat`, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
      auth: { userId, token },
      transports: ['websocket', 'polling']
    });
    
    this.setupEventListeners();
  }
  
  setupEventListeners(): void {
    if (!this.socket) return;
    
    this.socket.on('connect', () => {
      logger.info('Socket chat connecté');
      this.notifyConnectionChange(true);
    });
    
    this.socket.on('disconnect', (reason) => {
      logger.warn(`Socket chat déconnecté: ${reason}`);
      // Ne pas notifier la déconnexion si c'est un problème transitoire
      if (reason !== 'io server disconnect' && reason !== 'io client disconnect') {
        this.notifyConnectionChange(false);
      }
    });
    
    this.socket.on('connect_error', (error) => {
      logger.error(`Erreur de connexion chat: ${error.message}`);
    });
  }
    
  
  disconnect(): void {
    this.closeExistingConnection();
    this.connectionListeners.clear();
  }
  
  onConnectionChange(callback: ConnectionListener): () => void {
    this.connectionListeners.add(callback);
    return () => {
      this.connectionListeners.delete(callback);
    };
  }
  
  
  joinConversation(conversationId: string): void {
    if (!this.socket?.connected) {
      logger.warn('Impossible de rejoindre la conversation: non connecté');
      return;
    }
    
    this.socket.emit('joinConversation', conversationId);
  }
  
  leaveConversation(conversationId: string): void {
    if (!this.socket?.connected) return;
    this.socket.emit('leaveConversation', conversationId);
  }
  
  sendMessage(conversationId: string, content: string, userId: string): void {
    if (!this.socket?.connected) {
      logger.warn('Impossible d\'envoyer le message: non connecté');
      return;
    }
    
    logger.debug('ChatSocketService - Envoi du message:', { conversationId, content, userId });
    this.socket.emit('sendMessage', { conversationId, content, userId });
  }
  
  sendTypingStatus(conversationId: string, isTyping: boolean): void {
    if (!this.socket?.connected) return;
    
    this.socket.emit('typingStatus', { conversationId, isTyping });
  }
  
  onNewMessage(callback: (data: any) => void): () => void {
    if (!this.socket) return () => {};
    
    this.socket.on('newMessage', (data) => {
      logger.debug('Nouveau message Socket.IO:', data);
      callback(data);
    });
    
    return () => {
      this.socket?.off('newMessage', callback);
    };
  }
  
  isConnected(): boolean {
    return !!this.socket?.connected;
  }
  
  get connected(): boolean {
    return this.isConnected();
  }
}
