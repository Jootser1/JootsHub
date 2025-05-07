import { BaseSocketService } from '../../../lib/sockets/BaseSocketService';
import { logger } from '@/utils/logger';
import { useChatStore } from '@/features/chat/stores/chatStore';
import { chatEventRegistry } from './chatEventRegistry';
import { io } from 'socket.io-client';
export class ChatSocketService extends BaseSocketService {
  private static instance: ChatSocketService | null = null;
  private activeConversations: Set<string> = new Set<string>();
  private pingInterval: NodeJS.Timeout | null = null;

  constructor() {
    super('chat');
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
    
    logger.info('Enregistrement des événements socket chat pour', this.userId);
    Object.entries(chatEventRegistry).forEach(([event, handler]) => {
      this.onEvent(event, handler);
    });
  }    

  public unregisterEvents() {
    if (!this.socket) return;
    
    // Désenregistrer les événements spécifiques
    Object.keys(chatEventRegistry).forEach((event) => {
      this.socket?.off(event);
    });
    
    // Quitter toutes les conversations actives
    this.activeConversations.forEach(conversationId => {
      this.socket?.emit('leaveConversation', conversationId);
    });
    this.activeConversations.clear();
    
    logger.info('Événements chat désenregistrés');
  }

  joinConversation(conversationId: string): void {
    if (!this.socket?.connected) {
      logger.warn('Impossible de rejoindre la conversation: non connecté');
      return;
    }
    
    // Rejoindre la nouvelle conversation si pas déjà active
    if (!this.activeConversations.has(conversationId)) {
      this.socket.emit('joinConversation', conversationId);
      this.activeConversations.add(conversationId);
      logger.info(`Conversation rejointe: ${conversationId}`);
    }
  }
  
  leaveConversation(conversationId: string): void {
    if (!this.socket?.connected) {
      logger.warn('Impossible de quitter la conversation: non connecté');
      return;
    }
    
    if (this.activeConversations.has(conversationId)) {
      this.socket.emit('leaveConversation', conversationId);
      this.activeConversations.delete(conversationId);
      logger.info(`Conversation quittée: ${conversationId}`);
    }
  }

  leaveAllConversations(): void {
    if (!this.socket?.connected) {
      logger.warn('Impossible de quitter les conversations: non connecté');
      return;
    }
    
    for (const conversationId of this.activeConversations) {
      this.socket.emit('leaveConversation', conversationId);
    }
    this.activeConversations.clear();
    logger.info('Toutes les conversations quittées');
  }
  
  joinAllConversations(conversationIds: string[]): void {
    if (!this.socket?.connected) {
      logger.warn('Impossible de rejoindre les conversations: non connecté');
      return;
    }

    for (const conversationId of conversationIds) {
      if (!this.activeConversations.has(conversationId)) {
        this.socket.emit('joinConversation', conversationId);
        this.activeConversations.add(conversationId);
      }
    }
    
    logger.info(`${conversationIds.length} conversations rejointes`);
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
                  // S'assurer que l'utilisateur est dans la conversation
                  if (!this.activeConversations.has(conversationId)) {
                    this.joinConversation(conversationId);
                  }
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
      // S'assurer que l'utilisateur est dans la conversation avant d'envoyer
      if (!this.activeConversations.has(conversationId)) {
        this.joinConversation(conversationId);
      }
      
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
    
    // S'assurer que l'utilisateur est dans la conversation avant d'envoyer le statut
    if (!this.activeConversations.has(conversationId)) {
      this.joinConversation(conversationId);
    }
    
    this.socket.emit('typing', { 
      conversationId, 
      userId: this.userId,
      isTyping 
    });
  };

  sendIcebreakerReady = (conversationId: string, userId: string, isIcebreakerReady: boolean) => {
    if (!this.socket?.connected) {
      logger.warn('Impossible d\'envoyer le statut de Icebreaker ready: non connecté');
      return;
    }
    
    // S'assurer que l'utilisateur est dans la conversation avant d'envoyer
    if (!this.activeConversations.has(conversationId)) {
      this.joinConversation(conversationId);
    }
    
    this.socket.emit('icebreakerReady', { 
      conversationId, 
      userId: userId,
      isIcebreakerReady 
    });
  }

  getActiveConversations(): string[] {
    return Array.from(this.activeConversations);
  }
  
  isInConversation(conversationId: string): boolean {
    return this.activeConversations.has(conversationId);
  }
}