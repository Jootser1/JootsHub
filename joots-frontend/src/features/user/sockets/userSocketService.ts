import { BaseSocketService } from '../../../lib/sockets/BaseSocketService';
import { logger } from '@/utils/logger';
import { useUserStore } from '@/features/user/stores/userStore';
import { useContactStore } from '@/features/contacts/stores/contactStore';
import { createUserEventRegistry } from './userEventRegistry';
import { io } from 'socket.io-client';



export class UserSocketService extends BaseSocketService {
  private static instance: UserSocketService | null = null;
  private lastStatus: boolean | null = null;

  constructor() {
    super('user');
  }


  static getInstance(): UserSocketService {
    if (!UserSocketService.instance) {
      UserSocketService.instance = new UserSocketService();
    }
    return UserSocketService.instance;
  }

  public registerEvents() {
    if (!this.socket) {
      logger.warn('Impossible d\'enregistrer les événements user: socket non initialisé');
      return;
    }
    if (!this.userId) return;
    
    const eventRegistry = createUserEventRegistry(this.userId);
    Object.entries(eventRegistry).forEach(([event, handler]) => {
      this.onEvent(event, (data) => {
        handler(data);
      });
    })
    logger.info('Enregistrement des événements socket user pour', this.userId);
  }

  public unregisterEvents() {
    this.closeExistingSocketConnection();
    logger.info('Désenregistrement des événements socket pour', this.userId);
  }

  public updateUserStatus(userId: string, isOnline: boolean): void {    
    const userStore = useUserStore.getState();
    const contactStore = useContactStore.getState();
    if (!this.socket?.connected) {
      logger.warn('userSocketService: Impossible de mettre à jour le statut: non connecté');
      return;
    }

    try {   
      // Si c'est l'utilisateur actuel, mettre à jour son propre statut
      if (userId === this.userId) {
        // Ne mettre à jour le store que si le statut change
        if (this.lastStatus !== isOnline) {
          // Mettre à jour le statut local immédiatement
          userStore.updateUserStatus(isOnline);
          this.lastStatus = isOnline;
          
          // Émettre l'événement sans attendre d'accusé de réception
          // Le serveur pourrait ne pas implémenter la réponse à cet événement
          this.socket.emit('updateUserStatus', { isOnline });
          logger.info(`Émission du statut utilisateur: ${isOnline ? 'en ligne' : 'hors ligne'}`);
        }
      }
      
      // Mise à jour locale pour les contacts
      contactStore.setUserOnlineStatus(userId, isOnline);
    } catch (error) {
      logger.error('Erreur lors de la mise à jour du statut:', error);
    }
  }

  public joinContactsRooms(contactIds: string[]): void {
    if (!this.socket?.connected) {
      logger.warn('userSocketService: Impossible de rejoindre les rooms: non connecté');
      return;
    }

    try {
      this.socket.emit('joinContactsRooms', { contactIds });
    } catch (error) {
      logger.error('Erreur lors de la jointure des rooms:', error);
    }
  }

  public leaveContactsRooms(contactIds: string[]): void {
    if (!this.socket?.connected) {
      logger.warn('userSocketService: Impossible de quitter les rooms: non connecté');
      return;
    }

    try {
      this.socket.emit('leaveContactsRooms', { contactIds });
    } catch (error) {
      logger.error('Erreur lors de la sortie des rooms:', error);
    }
  }

  private emitNewUserStatus(isOnline: boolean): void {
    if (!this.socket?.connected) {
      logger.warn('userSocketService: Impossible de mettre à jour le statut: non connecté');
      return;
    }
    
    // Émettre l'événement sans callback pour éviter les erreurs de timeout
    this.socket.emit('updateUserStatus', { isOnline });
    logger.info(`Émission du statut utilisateur: ${isOnline ? 'en ligne' : 'hors ligne'}`);
  }
}