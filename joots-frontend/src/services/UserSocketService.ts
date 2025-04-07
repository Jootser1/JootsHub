import { BaseSocketService } from './BaseSocketService';
import { logger } from '@/utils/logger';
import { UserStatusChange } from '@/types/socket';

export class UserSocketService extends BaseSocketService {
  private static instance: UserSocketService;
  
  private constructor() {
    super('users');
  }
  
  static getInstance(): UserSocketService {
    if (!UserSocketService.instance) {
      UserSocketService.instance = new UserSocketService();
    }
    return UserSocketService.instance;
  }
  
  setupEventListeners(): void {
    this.socket?.on('connect', () => {
      logger.info('Socket utilisateur connecté');
      this.notifyConnectionChange(true);
    });
    
    this.socket?.on('disconnect', (reason) => {
      logger.warn(`Socket utilisateur déconnecté: ${reason}`);
      if (reason !== 'io server disconnect' && reason !== 'io client disconnect') {
        this.notifyConnectionChange(false);
      }
    });
    
    this.socket?.on('connect_error', (error) => {
      logger.error(`Erreur de connexion utilisateur: ${error.message}`);
    });
    
    this.socket?.on('ping', () => {
      this.socket?.emit('pong');
    });
  }
  
  emitNewUserStatus(isOnline: boolean): void {
    if (!this.socket?.connected) {
      logger.warn('Impossible de mettre à jour le statut: non connecté');
      return;
    }
    
    this.socket.emit('updateUserStatus', { isOnline });
  }
  
  onUserStatusChange(callback: (data: UserStatusChange) => void): () => void {
    if (!this.socket) return () => {};
    
    this.socket.on('userStatusChange', callback);
    
    return () => {
      this.socket?.off('userStatusChange', callback);
    };
  }
}
