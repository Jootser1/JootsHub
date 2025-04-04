import { io, Socket } from 'socket.io-client';
import { logger } from '@/utils/logger';
import { Message as ChatMessage, MessageStatus, MessageType } from '@/types/chat';
import { UserStatusChange, SocketMessage, TypingStatus } from '@/types/socket';

const BASE_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';
const USER_NAMESPACE = `${BASE_URL}/users`;
const CHAT_NAMESPACE = `${BASE_URL}/chat`;

type ConnectionListener = (status: boolean) => void;

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
  private userSocket: Socket | null = null;
  private chatSocket: Socket | null = null;
  private connectionListeners: Set<ConnectionListener> = new Set();
  private reconnectTimer: NodeJS.Timeout | null = null;
  
  private constructor() {}
  
  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }
  
  // Connexion Socket.IO
  connect(userId: string, token: string): void {
    logger.info(`Tentative de connexion pour l'utilisateur ${userId}`);
    
    // Fermer les connexions existantes
    this.closeExistingConnections();
    
    // Créer le socket utilisateur (statut en ligne)
    this.userSocket = io(USER_NAMESPACE, {
      auth: { userId, token },
      reconnection: true,
      reconnectionAttempts: 3,
      timeout: 10000
    });
    
    // Créer le socket chat (messages)
    this.chatSocket = io(CHAT_NAMESPACE, {
      auth: { userId, token },
      reconnection: true,
      reconnectionAttempts: 3,
      timeout: 10000
    });
    
    // Configurer les écouteurs d'événements
    this.setupEventListeners();
  }
  
  private setupEventListeners(): void {
    // Socket utilisateur - gestion de connexion
    this.userSocket?.on('connect', () => {
      logger.info('Socket utilisateur connecté');
      this.notifyConnectionChange(true);
    });
    
    this.userSocket?.on('disconnect', (reason) => {
      logger.warn(`Socket utilisateur déconnecté: ${reason}`);
      this.notifyConnectionChange(false);
    });
    
    this.userSocket?.on('connect_error', (error) => {
      logger.error(`Erreur de connexion: ${error.message}`);
      this.scheduleReconnect();
    });
    
    // Socket chat - gestion des erreurs
    this.chatSocket?.on('connect_error', (error) => {
      logger.error(`Erreur de connexion chat: ${error.message}`);
    });
    
    // Ping-pong pour maintenir la connexion
    this.userSocket?.on('ping', () => {
      this.userSocket?.emit('pong');
    });
  }
  
  private closeExistingConnections(): void {
    if (this.userSocket) {
      this.userSocket.removeAllListeners();
      this.userSocket.disconnect();
      this.userSocket = null;
    }
    
    if (this.chatSocket) {
      this.chatSocket.removeAllListeners();
      this.chatSocket.disconnect();
      this.chatSocket = null;
    }
    
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }
  
  private scheduleReconnect(): void {
    if (this.reconnectTimer) return;
    
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      // La reconnexion est gérée automatiquement par Socket.IO
    }, 5000);
  }
  
  private notifyConnectionChange(status: boolean): void {
    this.connectionListeners.forEach(listener => listener(status));
  }
  
  onConnectionChange(listener: ConnectionListener): () => void {
    this.connectionListeners.add(listener);
    return () => {
      this.connectionListeners.delete(listener);
    };
  }
  
  // Gestion des événements utilisateur
  updateUserStatus(isOnline: boolean): void {
    if (!this.userSocket?.connected) {
      logger.warn('Impossible de mettre à jour le statut: non connecté');
      return;
    }
    
    this.userSocket.emit('updateUserStatus', { isOnline });
  }
  
  // Gestion des événements de chat
  joinConversation(conversationId: string): void {
    if (!this.chatSocket?.connected) {
      logger.warn('Impossible de rejoindre la conversation: non connecté');
      return;
    }
    
    this.chatSocket.emit('joinConversation', conversationId);
  }
  
  leaveConversation(conversationId: string): void {
    if (!this.chatSocket?.connected) return;
    this.chatSocket.emit('leaveConversation', conversationId);
  }
  
  sendMessage(conversationId: string, content: string, userId: string): void {
    if (!this.chatSocket?.connected) {
      logger.warn('Impossible d\'envoyer le message: non connecté');
      return;
    }
    
    logger.debug('SocketService - Envoi du message:', { conversationId, content, userId });
    this.chatSocket.emit('sendMessage', { conversationId, content, userId });
  }
  
  sendTypingStatus(conversationId: string, isTyping: boolean): void {
    if (!this.chatSocket?.connected) return;
    
    this.chatSocket.emit('typingStatus', { conversationId, isTyping });
  }
  
  // Écouteurs d'événements
  onUserStatusChange(callback: (data: any) => void): () => void {
    if (!this.userSocket) return () => {};
    
    this.userSocket.on('userStatusChange', callback);
    return () => {
      this.userSocket?.off('userStatusChange', callback);
    };
  }
  
  onNewMessage(callback: (data: any) => void): () => void {
    if (!this.chatSocket) return () => {};
    
    // Debug pour vérifier les événements
    this.chatSocket.on('newMessage', (data) => {
      console.log('Nouveau message Socket.IO:', data);
      callback(data);
    });
    
    return () => {
      this.chatSocket?.off('newMessage', callback);
    };
  }
  
  // Nettoyage
  disconnect(): void {
    this.closeExistingConnections();
    this.connectionListeners.clear();
  }
  
  // Getters
  getUserSocket(): Socket | null {
    return this.userSocket;
  }
  
  getChatSocket(): Socket | null {
    return this.chatSocket;
  }
  
  isUserSocketConnected(): boolean {
    return !!this.userSocket?.connected;
  }
  
  isChatSocketConnected(): boolean {
    return !!this.chatSocket?.connected;
  }
}

export default SocketService; 