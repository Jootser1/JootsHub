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
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { BaseGateway } from './base.gateway';
import { UserContactsService } from '../users/contacts/contacts.service';
import { UsersService } from '../users/users.service';

@WebSocketGateway({
  cors: {
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://joots.app'
        : ['https://localhost', 'http://localhost:3000'],
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

    this.logger.log(
      `[User Socket ${client.id}] ${userId} : Début de la connexion`
    );

    try {
      // 1. Mettre à jour le statut dans Redis
      await this.usersService.addUserInRedisOnlineUsers(client, userId);
      
      this.logger.debug(
        `[User Socket ${client.id}] ${userId} : Statut mis à jour dans Redis`
      );

      // 2. Récupérer les contacts
      const contactsIds = await this.userContactsService.getContactsIds(userId);

      if (!contactsIds || contactsIds.length === 0) {
        this.logger.debug(
          `[User Socket ${client.id}] ${userId} : Aucun contact trouvé`
        );
        return;
      }

      this.logger.debug(
        `[User Socket ${client.id}] ${userId} : ${contactsIds.length} contacts trouvés: ${contactsIds.map(id => id.substring(0, 8) + '...').join(', ')}`
      );

      // 3. Rejoindre les rooms des contacts
      contactsIds.forEach((contactId) => {
        client.join(`user-status-${contactId}`);
      });

      this.logger.debug(
        `[User Socket ${client.id}] ${userId} : Rejoint les rooms de ${contactsIds.length} contacts`
      );

      // 4. Envoyer les statuts en ligne des contacts après la connexion
      setTimeout(async () => {
        try {
          const onlineContactsIds: string[] = [];
          
          for (const contactId of contactsIds) {
            const isOnline = await this.redis.sismember('online_users', contactId);
            if (isOnline) {
              onlineContactsIds.push(contactId);
            }
          }

          this.logger.debug(
            `[User Socket ${client.id}] ${userId} : ${onlineContactsIds.length}/${contactsIds.length} contacts en ligne détectés`
          );

          // Envoyer les statuts en ligne au client
          for (const contactId of onlineContactsIds) {
            client.emit('userStatusChange', {
              user_id: contactId,
              is_online: true,
              timestamp: new Date().toISOString(),
            });
          }

          this.logger.debug(
            `[User Socket ${client.id}] ${userId} : Statuts de ${onlineContactsIds.length}/${contactsIds.length} contacts en ligne envoyés à la connexion`
          );
        } catch (error) {
          this.logger.error(
            `[User Socket ${client.id}] ${userId} : Erreur lors de l'envoi des statuts en ligne: ${error.message}`
          );
        }
      }, 500); // Délai pour s'assurer que le client est prêt

      // 5. Notifier les contacts que cet utilisateur est maintenant en ligne
      await this.notifyContactsStatusChange(userId, true);
      
      this.logger.log(
        `[User Socket ${client.id}] ${userId} : Utilisateur connecté et statut diffusé à ${contactsIds.length} contacts`
      );
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

      // Notifier via les rooms
      this.server.to(`user-status-${userId}`).emit('userStatusChange', {
        user_id: userId,
        is_online: isOnline,
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
    @MessageBody() payload: { user_id: string; is_online: boolean }
  ) {
    const userId = client.data.userId;
    if (!userId) return;

    const { user_id, is_online } = payload;

    try {
      // Mettre à jour Redis
      if (is_online) {
        await this.usersService.addUserInRedisOnlineUsers(client, user_id);
      } else {
        await this.usersService.removeUserInRedisOnlineUsers(client, user_id);
      }
      this.logger.log(
        `[Redis] ${user_id} : Statut utilisateur mis à jour : ${is_online}`
      );

      // Notifier les contacts
      await this.notifyContactsStatusChange(user_id, is_online);

      this.logger.log(
        `[User Socket ${client.id}] ${user_id} : Statut mis à jour manuellement: ${is_online ? 'en ligne' : 'hors ligne'}`
      );
    } catch (error) {
      this.logger.error(
        `[User Socket ${client.id}] Erreur lors de la mise à jour du statut: ${error.message}`
      );
    }
  }

  @SubscribeMessage('getContactsOnlineStatus')
  async handleGetContactsOnlineStatus(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { contact_ids: string[] }
  ) {
    const userId = client.data.userId;
    if (!userId) return;

    const { contact_ids } = payload;

    try {
      // Validation du payload
      if (!contact_ids || !Array.isArray(contact_ids)) {
        this.logger.warn(
          `[User Socket ${client.id}] ${userId} : contact_ids invalide ou manquant dans le payload:`,
          payload
        );
        return;
      }

      if (contact_ids.length === 0) {
        this.logger.debug(
          `[User Socket ${client.id}] ${userId} : Aucun contact à vérifier`
        );
        return;
      }

      // Récupérer les statuts en ligne depuis Redis
      const onlineContactsIds: string[] = [];
      
      for (const contactId of contact_ids) {
        if (typeof contactId !== 'string') {
          this.logger.warn(
            `[User Socket ${client.id}] ${userId} : ID de contact invalide (non-string):`,
            contactId
          );
          continue;
        }

        const isOnline = await this.redis.sismember('online_users', contactId);
        if (isOnline) {
          onlineContactsIds.push(contactId);
        }
      }

      // Envoyer les statuts en ligne au client
      for (const contactId of onlineContactsIds) {
        client.emit('userStatusChange', {
          user_id: contactId,
          is_online: true,
          timestamp: new Date().toISOString(),
        });
      }

      this.logger.debug(
        `[User Socket ${client.id}] ${userId} : Statuts de ${onlineContactsIds.length}/${contact_ids.length} contacts en ligne envoyés`
      );
    } catch (error) {
      this.logger.error(
        `[User Socket ${client.id}] ${userId} : Erreur lors de la récupération des statuts en ligne: ${error.message}`
      );
    }
  }


  findSocketIdByUserId(userId: string): string | null {
    const socketId = this.userSockets.get(userId);
    return socketId ?? null;
  }
}
