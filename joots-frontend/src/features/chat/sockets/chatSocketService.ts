import { BaseSocketService } from '../../../lib/sockets/BaseSocketService';
import { logger } from '@/utils/logger';
import { useChatStore } from '@/features/chat/stores/chatStore';
import { chatEventRegistry } from './chatEventRegistry';
import { io } from 'socket.io-client';
export class ChatSocketService extends BaseSocketService {
  private static instance: ChatSocketService | null = null;
  private activeConversation: string | null = null;

  constructor() {
    super('chat');
  }

  connect(userId: string, token: string): void {
    logger.info(`BaseSocketService: Tentative de connexion sur ${this.namespace} pour l'utilisateur ${userId}`);
    
    if (this.socket) {
      if (this.socket.connected) {
        logger.info(`BaseSocketService: Socket déjà connecté pour ${this.namespace}`);
        return;
      }
    }

    this.userId = userId;
    this.token = token;
    
    if (this.socket && !this.socket.connected) {
      this.socket.removeAllListeners();
      this.socket = null;
    }
    
    const BASE_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';
    logger.info(`BaseSocketService: Connexion à ${BASE_URL}/${this.namespace}`);
    this.socket = io(`${BASE_URL}/${this.namespace}`, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
      auth: { userId, token },
      transports: ['websocket', 'polling']
    });
    
    this.setupEventListeners();
    //this.setupUserEventListeners()
  }

  static getInstance(): ChatSocketService {
    if (!ChatSocketService.instance) {
      ChatSocketService.instance = new ChatSocketService();
    }
    return ChatSocketService.instance;
  }

  static resetInstance() {
    ChatSocketService.instance = null;
  }

  public registerEvents() {
    if (!this.socket) {
      logger.warn('Impossible d\'enregistrer les événements chat: socket non initialisé');
      return;
    }
    
    logger.info('Enregistrement des événements chat');
    Object.entries(chatEventRegistry).forEach(([event, handler]) => {
      this.onEvent(event, handler);
    });
    
    // Enregistrer des événements spécifiques de Socket.IO pour le débuggage
    this.socket.on('connect', () => {
      logger.info('Socket chat connecté');
    });
    
    this.socket.on('disconnect', (reason) => {
      logger.info(`Socket chat déconnecté: ${reason}`);
      if (this.activeConversation) {
        logger.info(`Déconnecté de la conversation: ${this.activeConversation}`);
        this.activeConversation = null;
      }
    });
    
    this.socket.on('error', (error) => {
      logger.error(`Erreur socket chat: ${error}`);
    });
  }

  public unregisterEvents() {
    if (!this.socket) return;
    
    // Désenregistrer les événements spécifiques
    Object.keys(chatEventRegistry).forEach((event) => {
      this.socket?.off(event);
    });
    
    // Quitter la conversation active si elle existe
    if (this.activeConversation) {
      this.leaveConversation(this.activeConversation);
      this.activeConversation = null;
    }
    
    logger.info('Événements chat désenregistrés');
  }


  joinConversation(conversationId: string): void {
    if (!this.socket?.connected) {
      logger.warn('Impossible de rejoindre la conversation: non connecté');
      return;
    }
    
    // Quitter la conversation actuelle si elle existe et est différente
    if (this.activeConversation && this.activeConversation !== conversationId) {
      this.leaveConversation(this.activeConversation);
    }
    
    this.socket.emit('joinConversation', conversationId);
    this.activeConversation = conversationId;
    logger.info(`Conversation rejointe: ${conversationId}`);
  }
  
  leaveConversation(conversationId: string): void {
    if (!this.socket?.connected) {
      logger.warn('Impossible de quitter la conversation: non connecté');
      return;
    }
    
    this.socket.emit('leaveConversation', conversationId);
    if (this.activeConversation === conversationId) {
      this.activeConversation = null;
    }
    logger.info(`Conversation quittée: ${conversationId}`);
  }
  
  sendMessage = (conversationId: string, content: string, userId: string) => {
    if (!this.socket?.connected) {
      logger.warn('Impossible d\'envoyer le message: non connecté');
      return false;
    }
    
    this.socket.emit('sendMessage', { conversationId, content, userId });
    logger.info(`Message envoyé dans la conversation ${conversationId}`);
    return true;
  }

  sendTypingStatus = (conversationId: string, isTyping: boolean) => {
    if (!this.socket?.connected) {
      logger.warn('Impossible d\'envoyer le statut de frappe: non connecté');
      return;
    }
    
    this.socket.emit('typingStatus', { conversationId, isTyping });
  };
  
  getActiveConversation(): string | null {
    return this.activeConversation;
  }
}