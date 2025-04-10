import { BaseSocketService } from '../BaseSocketService';
import { logger } from '@/utils/logger';
import { useUserStore } from '@/stores/userStore';
import { useContactStore } from '@/stores/contactStore';
import { userEventRegistry } from './userEventRegistry';

const userStore = useUserStore.getState();
const contactStore = useContactStore.getState();

export class UserSocketService extends BaseSocketService {
  private static instance: UserSocketService | null = null;

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
    Object.entries(userEventRegistry).forEach(([event, handler]) => {
      this.onEvent(event, handler);
    });
  }

  public unregisterEvents() {
    this.closeExistingSocketConnection();
  }

  public updateUserStatus(userId: string, isOnline: boolean): void {
    if (!this.socket?.connected) {
      logger.warn('Impossible de mettre à jour le statut: non connecté');
      return;
    }

    try {
      logger.debug(`Mise à jour du statut: userId=${userId}, isOnline=${isOnline}`);
      
      // Mise à jour locale
      contactStore.setUserOnlineStatus(userId, isOnline);
      
      // Si c'est l'utilisateur actuel, mettre à jour aussi son propre statut
      if (userId === this.userId) {
        userStore.updateUserStatus(isOnline);
        this.emitNewUserStatus(isOnline);
      }
    } catch (error) {
      logger.error('Erreur lors de la mise à jour du statut:', error);
    }
  }

  private emitNewUserStatus(isOnline: boolean): void {
    if (!this.socket?.connected) {
      logger.warn('Impossible de mettre à jour le statut: non connecté');
      return;
    }
    this.socket?.emit('updateUserStatus', { isOnline });
  }
}