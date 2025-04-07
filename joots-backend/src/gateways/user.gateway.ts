import {
  WebSocketGateway,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { BaseGateway } from './base.gateway';
import { UserContactsService } from 'src/users/contacts/contacts.service';

@WebSocketGateway({
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? 'https://joots.app' 
      : 'http://localhost:3000',
    credentials: true
  },
  namespace: 'users'
})

export class UserGateway extends BaseGateway {
  private connectedUsers = new Map<string, Set<string>>();
  
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly userContactsService: UserContactsService
  ) {
    super(UserGateway.name);
  }
  
  // Gestion de la connexion
  async handleConnection(client: Socket) {
    const userId = client.data.userId;
    
    if (!userId) {
      this.logger.warn(`Connexion rejetée sans ID utilisateur: ${client.id}`);
      client.disconnect();
      return;
    }
    
    // Enregistrer le client
    if (!this.connectedUsers.has(userId)) {
      this.connectedUsers.set(userId, new Set());
    }
    this.connectedUsers.get(userId)?.add(client.id);
    
    // Mettre à jour Redis et la base de données
    await this.redis.sadd('online_users', userId);
    await this.redis.set(`user:${userId}:last_seen`, Date.now().toString());
    
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: { isOnline: true }
      });
      
      // Notifier uniquement les contacts
      await this.notifyContactsStatusChange(userId, true);
      
      this.logger.log(`Utilisateur connecté: ${userId} (socket: ${client.id})`);
    } catch (error) {
      this.logger.error(`Erreur lors de la mise à jour du statut: ${error.message}`);
    }
  }
  
  // Gestion de la déconnexion
  async handleDisconnect(client: Socket) {
    const userId = client.data.userId;
    
    if (!userId) {
      this.logger.warn(`Déconnexion d'un client non identifié: ${client.id}`);
      return;
    }
    
    // Retirer le client de la liste
    this.connectedUsers.get(userId)?.delete(client.id);
    
    // Si c'était le dernier socket, marquer l'utilisateur comme hors ligne
    if (this.connectedUsers.get(userId)?.size === 0) {
      this.connectedUsers.delete(userId);
      
      // Mettre à jour Redis et la base de données
      await this.redis.srem('online_users', userId);
      await this.redis.set(`user:${userId}:last_seen`, Date.now().toString());
      
      try {
        await this.prisma.user.update({
          where: { id: userId },
          data: { isOnline: false }
        });
        
        // Notifier les autres clients
        this.server.emit('userStatusChange', {
          userId,
          isOnline: false,
          timestamp: new Date().toISOString()
        });
        
        this.logger.log(`Utilisateur déconnecté: ${userId}`);
      } catch (error) {
        this.logger.error(`Erreur lors de la mise à jour du statut: ${error.message}`);
      }
    } else {
      this.logger.debug(`Socket ${client.id} déconnecté, mais l'utilisateur ${userId} a encore d'autres connexions actives`);
    }
  }
  
  private async notifyContactsStatusChange(userId: string, isOnline: boolean) {
    try {
      // Récupérer tous les utilisateurs dont cet utilisateur est un contact
      const contactOf = await this.prisma.userContact.findMany({
        where: { contactId: userId },
        select: { userId: true }
      });
      
      // Pour chaque utilisateur qui a cet utilisateur en contact
      contactOf.forEach(({ userId: contactUserId }) => {
        // Si ce contact est connecté, lui envoyer la notification
        const socketIds = this.connectedUsers.get(contactUserId);
        if (socketIds && socketIds.size > 0) {
          // Émettre uniquement aux sockets de ce contact
          socketIds.forEach(socketId => {
            const socket = this.server.sockets.sockets.get(socketId);
            if (socket) {
              socket.emit('userStatusChange', {
                userId,
                isOnline,
                timestamp: new Date().toISOString()
              });
            }
          });
        }
      });
      
      this.logger.debug(`Notification de changement de statut envoyée aux contacts de ${userId}`);
    } catch (error) {
      this.logger.error(`Erreur lors de la notification des contacts: ${error.message}`);
    }
  }
  // Mise à jour manuelle du statut
  @SubscribeMessage('updateUserStatus')
  async handleUpdateUserStatus(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { isOnline: boolean }
  ) {
    const userId = client.data.userId;
    
    if (!userId) {
      return { success: false, error: 'Non authentifié' };
    }
    
    const isOnline = data.isOnline;
    
    try {
      if (isOnline) {
        await this.redis.sadd('online_users', userId);
      } else {
        await this.redis.srem('online_users', userId);
      }
      
      await this.prisma.user.update({
        where: { id: userId },
        data: { isOnline }
      });
      
      this.server.emit('userStatusChange', {
        userId,
        isOnline,
        timestamp: new Date().toISOString()
      });
      
      return { success: true };
    } catch (error) {
      this.logger.error(`Erreur lors de la mise à jour du statut: ${error.message}`);
      return { success: false, error: error.message };
    }
  }
  
  // Ping-pong pour maintenir la connexion
  @SubscribeMessage('pong')
  handlePong(client: Socket) {
    const userId = client.data.userId;
    
    if (userId) {
      this.redis.set(`user:${userId}:last_seen`, Date.now().toString());
    }
  }
} 