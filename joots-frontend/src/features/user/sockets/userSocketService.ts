import { BaseSocketService } from '../../../lib/sockets/BaseSocketService';
import { logger } from '@/utils/logger';
import { useUserStore } from '@/features/user/stores/userStore';
import { createUserEventRegistry } from './userEventRegistry';
import { UserStatusChangeData } from './userEventRegistry';

type UserEventHandler = (data: UserStatusChangeData | Record<string, unknown>) => void;

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
      this.onEvent(event, (data: unknown) => {
        if (event === 'userStatusChange') {
          if (this.isUserStatusChangeData(data)) {
            (handler as UserEventHandler)(data);
          } else {
            logger.warn('Données de statut utilisateur invalides reçues');
          }
        } else {
          (handler as UserEventHandler)(data as Record<string, unknown>);
        }
      });
    })
  }
  
  public unregisterEvents() {
    this.closeExistingSocketConnection();
  }
  
  public updateUserStatus(userId: string, isOnline: boolean): void {    
    const userStore = useUserStore.getState();
    
    if (!this.socket?.connected) {
      logger.warn('userSocketService: Impossible de mettre à jour le statut: non connecté');
      return;
    }
    
    try {   
      // Si c'est l'utilisateur actuel, mettre à jour son propre statut
      if (userId === this.userId) {
        userStore.setUserStatus(isOnline);
        this.socket.emit('updateUserStatus', { isOnline });
        logger.info(`Émission du statut utilisateur: ${isOnline ? 'en ligne' : 'hors ligne'}`);
      }
    } catch (error) {
      logger.error('Erreur lors de la mise à jour du statut:', error instanceof Error ? error : new Error(String(error)));
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
      logger.error('Erreur lors de la jointure des rooms:', error instanceof Error ? error : new Error(String(error)));
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
      logger.error('Erreur lors de la sortie des rooms:', error instanceof Error ? error : new Error(String(error)));
    }
  }

  private isUserStatusChangeData(data: unknown): data is UserStatusChangeData {
    return (
      typeof data === 'object' &&
      data !== null &&
      'userId' in data &&
      'isOnline' in data &&
      typeof (data as UserStatusChangeData).userId === 'string' &&
      typeof (data as UserStatusChangeData).isOnline === 'boolean'
    );
  }
}