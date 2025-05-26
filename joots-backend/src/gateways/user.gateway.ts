import {
  WebSocketGateway,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { BaseGateway } from './base.gateway';
import { UserContactsService } from '../users/contacts/contacts.service';
import { UsersService } from '../users/users.service';

@WebSocketGateway({
  cors: {
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://joots.app'
        : 'http://localhost:3000',
    credentials: true,
  },
  namespace: 'user',
})
export class UserGateway extends BaseGateway {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly userContactsService: UserContactsService,
    private readonly usersService: UsersService
  ) {
    super(UserGateway.name);
  }

  // Map userId → socketId
  private userSockets = new Map<string, string>();

  // Map socketId → userId (pour cleanup)
  private socketUsers = new Map<string, string>();

  async handleConnection(client: Socket) {
    const userId = client.data.userId;

    if (!userId) {
      this.logger.warn(
        `[User Socket ${client.id}] Connexion rejetée sans ID utilisateur`
      );
      client.disconnect();
      return;
    }

    // Enregistrement des maps
    this.userSockets.set(userId, client.id);
    this.socketUsers.set(client.id, userId);

    try {
      await this.usersService.updateUserStatusinBDD(userId, true);
      await this.usersService.addUserInRedisOnlineUsers(client, userId);
      const contactsIds = await this.userContactsService.getContactsIds(userId);

      if (!contactsIds) {
        return;
      }

      contactsIds.forEach((contactId) => {
        client.join(`user-status-${contactId}`);
      });
      // Notifier les contacts via les rooms
      //await this.notifyContactsStatusChange(userId, true)
    } catch (error) {
      this.logger.error(
        `[User Socket ${client.id}] Erreur lors de la connexion: ${error.message}`
      );
    }
  }

  async handleDisconnect(client: Socket) {
    const userId = client.data.userId;
    if (!userId) return;

    this.userSockets.delete(userId);
    this.socketUsers.delete(client.id);

    try {
      // Mettre à jour le statut dans la BDD
      await this.usersService.updateUserStatusinBDD(userId, false);
      await this.usersService.removeUserInRedisOnlineUsers(client, userId);

      // Notifier les contacts via les rooms
      await this.notifyContactsStatusChange(userId, false);

      this.logger.log(
        `[User Socket ${client.id}] ${userId} : Utilisateur déconnecté`
      );
    } catch (error) {
      this.logger.error(
        `[User Socket ${client.id}] ${userId} : Erreur lors de la déconnexion: ${error.message}`
      );
    }
  }

  private async notifyContactsStatusChange(userId: string, isOnline: boolean) {
    try {
      // Récupérer les informations de l'utilisateur
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { username: true },
      });

      // Notifier via les rooms
      this.server.to(`user-status-${userId}`).emit('userStatusChange', {
        userId,
        username: user?.username,
        isOnline,
        timestamp: new Date().toISOString(),
      });

      this.logger.debug(
        `[User Socket] ${userId} : Statut ${isOnline ? 'en ligne' : 'hors ligne'} notifié à ses contacts`
      );
    } catch (error) {
      this.logger.error(
        `[User Socket] ${userId} : Erreur lors de la notification de son statut à ses contacts: ${error.message}`
      );
    }
  }

  @SubscribeMessage('joinContactsRooms')
  async handleJoinContactsRooms(
    client: Socket,
    payload: { contactIds: string[] }
  ) {
    const { contactIds } = payload;

    contactIds.forEach((contactId) => {
      client.join(`user-status-${contactId}`);
    });
  }

  @SubscribeMessage('leaveContactsRooms')
  async handleLeaveContactsRooms(
    client: Socket,
    payload: { contactIds: string[] }
  ) {
    const { contactIds } = payload;

    contactIds.forEach((contactId) => {
      client.leave(`user-status-${contactId}`);
    });
    this.logger.debug(
      `[User Socket] ${client.data.userId} : a quitté les rooms de contacts: ${contactIds.join(', ')}`
    );
  }

  @SubscribeMessage('pong')
  async handlePong(client: Socket) {
    const userId = client.data.userId;
    if (userId) {
      await this.redis.set(`user:${userId}:last_seen`, Date.now().toString());
    }
  }

  @SubscribeMessage('updateUserStatus')
  async handleUpdateUserStatus(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { isOnline: boolean }
  ) {
    const userId = client.data.userId;
    if (!userId) return;

    const { isOnline } = payload;

    try {
      // Mettre à jour le statut dans la BDD
      await this.usersService.updateUserStatusinBDD(userId, isOnline);

      // Mettre à jour Redis
      if (isOnline) {
        await this.usersService.addUserInRedisOnlineUsers(client, userId);
      } else {
        await this.usersService.removeUserInRedisOnlineUsers(client, userId);
      }
      this.logger.log(
        `[Redis] ${userId} : Statut utilisateur mis à jour : ${isOnline}`
      );

      // Notifier les contacts
      await this.notifyContactsStatusChange(userId, isOnline);

      this.logger.log(
        `[User Socket ${client.id}] ${userId} : Statut mis à jour manuellement: ${isOnline ? 'en ligne' : 'hors ligne'}`
      );
    } catch (error) {
      this.logger.error(
        `[User Socket ${client.id}] Erreur lors de la mise à jour du statut: ${error.message}`
      );
    }
  }

  private async sendOnlineContactsToUser(
    client: Socket,
    userId: string,
    onlineContactsIds: string[]
  ) {
    try {
      for (const contactId of onlineContactsIds) {
        this.server.to(`user-status-${contactId}`).emit('userStatusChange', {
          userId: contactId,
          isOnline: true,
          timestamp: new Date().toISOString(),
        });
      }

      this.logger.debug(
        `[User Socket ${client.id}] ${userId} : État de ${onlineContactsIds.length} contacts en ligne envoyé`
      );
    } catch (error) {
      this.logger.error(
        `[User Socket ${client.id}] ${userId} : Erreur lors de l'envoi des contacts en ligne: ${error.message}`
      );
    }
  }

  findSocketIdByUserId(userId: string): string | null {
    const socketId = this.userSockets.get(userId);
    return socketId ?? null;
  }
}
