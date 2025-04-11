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

@WebSocketGateway({
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? 'https://joots.app' 
      : 'http://localhost:3000',
    credentials: true
  },
  namespace: 'user'
})
export class UserGateway extends BaseGateway {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService
  ) {
    super(UserGateway.name);
  }

  async handleConnection(client: Socket) {
    const userId = client.data.userId;
    console.log('token', client.handshake.auth.token);
    
    if (!userId) {
      this.logger.warn(`Connexion rejetée sans ID utilisateur: ${client.id}`);
      client.disconnect();
      return;
    }

    try {
      // Mettre à jour le statut dans la BDD
      await this.prisma.user.update({
        where: { id: userId },
        data: { isOnline: true }
      });

      // Mettre à jour Redis
      await this.redis.sadd('online_users', userId);
      await this.redis.set(`user:${userId}:last_seen`, Date.now().toString());
      this.logger.log(`Utilisateur connecté: ${userId}`);
      
      // Notifier les contacts via les rooms
      await this.notifyContactsStatusChange(userId, true);
      
      
    } catch (error) {
      this.logger.error(`Erreur lors de la connexion: ${error.message}`);
    }
  }

  async handleDisconnect(client: Socket) {
    const userId = client.data.userId;
    if (!userId) return;

    try {
      // Mettre à jour le statut dans la BDD
      await this.prisma.user.update({
        where: { id: userId },
        data: { isOnline: false }
      });

      // Mettre à jour Redis
      await this.redis.srem('online_users', userId);
      await this.redis.set(`user:${userId}:last_seen`, Date.now().toString());

      // Notifier les contacts via les rooms
      await this.notifyContactsStatusChange(userId, false);
      
      this.logger.log(`Utilisateur déconnecté: ${userId}`);
    } catch (error) {
      this.logger.error(`Erreur lors de la déconnexion: ${error.message}`);
    }
  }

  private async notifyContactsStatusChange(userId: string, isOnline: boolean) {
    try {
      // Récupérer les contacts de l'utilisateur
      const contacts = await this.prisma.userContact.findMany({
        where: { contactId: userId },
        select: { userId: true }
      });

      // Récupérer les informations de l'utilisateur
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { username: true }
      });

      // Notifier via les rooms
      this.server.to(`user-status-${userId}`).emit('userStatusChange', {
        userId,
        username: user?.username,
        isOnline,
        timestamp: new Date().toISOString()
      });

      this.logger.debug(`Statut ${isOnline ? 'en ligne' : 'hors ligne'} notifié aux contacts de ${user?.username || userId}`);
    } catch (error) {
      this.logger.error(`Erreur lors de la notification des contacts: ${error.message}`);
    }
  }

  @SubscribeMessage('joinContactsRooms')
  async handleJoinContactsRooms(client: Socket, payload: { contactIds: string[] }) {
    const { contactIds } = payload;
    
    contactIds.forEach(contactId => {
      client.join(`user-status-${contactId}`);
    });
  }

  @SubscribeMessage('leaveContactsRooms')
  async handleLeaveContactsRooms(client: Socket, payload: { contactIds: string[] }) {
    const { contactIds } = payload;
    
    contactIds.forEach(contactId => {
      client.leave(`user-status-${contactId}`);
    });
  }

  @SubscribeMessage('pong')
  async handlePong(client: Socket) {
    const userId = client.data.userId;
    if (userId) {
      await this.redis.set(`user:${userId}:last_seen`, Date.now().toString());
    }
  }
} 