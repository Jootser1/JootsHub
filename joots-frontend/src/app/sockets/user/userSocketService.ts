import { BaseSocketService } from '../BaseSocketService';
import { logger } from '@/utils/logger';
import { useUserStore } from '@/stores/userStore';
import { useContactStore } from '@/stores/contactStore';
import { createUserEventRegistry } from './userEventRegistry';
import { io } from 'socket.io-client';

const userStore = useUserStore.getState();
const contactStore = useContactStore.getState();

export class UserSocketService extends BaseSocketService {
  private static instance: UserSocketService | null = null;
  private lastStatus: boolean | null = null;

  constructor() {
    super('user');
  }

  connect(userId: string, token: string): void {
    logger.info(`BaseSocketService: Tentative de connexion sur ${this.namespace} pour l'utilisateur ${userId}`);
    
    this.userId = userId;
    this.token = token;
    
    this.closeExistingSocketConnection();
    
    const BASE_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';
    
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

  static getInstance(): UserSocketService {
    if (!UserSocketService.instance) {
      UserSocketService.instance = new UserSocketService();
    }
    return UserSocketService.instance;
  }

  public registerEvents() {
    if (!this.userId) return;
    
    const eventRegistry = createUserEventRegistry(this.userId);
    Object.entries(eventRegistry).forEach(([event, handler]) => {
      this.onEvent(event, handler);
    })
    logger.info('Enregistrement des événements socket pour', this.userId);
  }

  public unregisterEvents() {
    this.closeExistingSocketConnection();
  }

  public updateUserStatus(userId: string, isOnline: boolean): void {
    if (!this.socket?.connected) {
      logger.warn('userSocketService: Impossible de mettre à jour le statut: non connecté');
      return;
    }

    try {   
      // Si c'est l'utilisateur actuel, mettre à jour son propre statut
      if (userId === this.userId) {
        // Ne mettre à jour le store que si le statut change
        if (this.lastStatus !== isOnline) {
          userStore.updateUserStatus(isOnline);
          this.emitNewUserStatus(isOnline);
          this.lastStatus = isOnline;
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
    this.socket?.emit('updateUserStatus', { isOnline });
  }
}