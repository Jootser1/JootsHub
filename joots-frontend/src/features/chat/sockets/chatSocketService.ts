import { BaseSocketService } from '../../../lib/sockets/BaseSocketService';
import { logger } from '@/utils/logger';
import { useChatStore } from '@/features/chat/stores/chatStore';
import { chatEventRegistry } from './chatEventRegistry';
import { io } from 'socket.io-client';
export class ChatSocketService extends BaseSocketService {
  private static instance: ChatSocketService | null = null;
  private activeConversation: string | null = null;
  private pingInterval: NodeJS.Timeout | null = null;

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
    this.startPingInterval();
  }

  private startPingInterval() {
    // Arrêter l'intervalle existant si présent
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
    }
    
    // Créer un nouvel intervalle qui envoie un ping toutes les 30 secondes
    this.pingInterval = setInterval(() => {
      if (this.socket?.connected) {
        this.socket.emit('ping');
        logger.debug('Ping envoyé pour maintenir la connexion active');
      } else {
        // Si le socket est déconnecté, essayer de reconnecter
        logger.warn('Socket déconnecté lors du ping. Tentative de reconnexion...');
        if (this.userId && this.token) {
          this.connect(this.userId, this.token);
        } else {
          logger.warn('Impossible de reconnecter: informations d\'authentification manquantes');
        }
      }
    }, 30000); // 30 secondes
  }

  disconnect(): void {
    // Arrêter l'intervalle de ping avant de déconnecter
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
    
    super.disconnect();
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
      logger.warn('Socket chat déconnecté. Tentative de reconnexion...');
      
      // Tenter de reconnecter si nous avons les informations d'authentification
      if (this.userId && this.token) {
        try {
          this.connect(this.userId, this.token);
          
          // Retourner une promesse mais s'assurer qu'elle se résout correctement
          return new Promise<boolean>((resolve) => {
            const timeout = setTimeout(() => {
              logger.error('Timeout de reconnexion dépassé');
              resolve(false);
            }, 3000); // Timeout de sécurité
            
            // Fonction d'envoi après reconnexion
            const sendAfterReconnect = () => {
              clearTimeout(timeout);
              if (this.socket?.connected) {
                try {
                  this.socket.emit('sendMessage', { conversationId, content, userId });
                  logger.info(`Message envoyé après reconnexion dans la conversation ${conversationId}`);
                  resolve(true);
                } catch (e) {
                  logger.error('Erreur lors de l\'envoi du message après reconnexion', e);
                  resolve(false);
                }
              } else {
                logger.error('Échec de reconnexion, impossible d\'envoyer le message');
                resolve(false);
              }
            };
            
            // Attendre un court instant pour la connexion et réessayer
            setTimeout(sendAfterReconnect, 1000);
          });
        } catch (e) {
          logger.error('Erreur lors de la tentative de reconnexion', e);
          return false;
        }
      }
      
      logger.warn('Impossible d\'envoyer le message: informations d\'authentification manquantes');
      return false;
    }
    
    try {
      this.socket.emit('sendMessage', { conversationId, content, userId });
      logger.info(`Message envoyé dans la conversation ${conversationId}`);
      return true;
    } catch (e) {
      logger.error('Erreur lors de l\'envoi du message', e);
      return false;
    }
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