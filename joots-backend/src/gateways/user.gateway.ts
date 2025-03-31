import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../../prisma/prisma.service';
import { createClient } from 'redis';
import * as jwt from "jsonwebtoken";
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../redis/redis.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: { 
    origin: process.env.NODE_ENV === 'production' 
      ? 'https://joots.app' // URL de production
      : 'http://localhost:3000', // URL de développement
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['authorization', 'content-type']
  },
  namespace: 'users',
  transports: ['websocket', 'polling'],
  pingTimeout: parseInt(process.env.SOCKET_PING_TIMEOUT || '60000'),
  pingInterval: parseInt(process.env.SOCKET_PING_INTERVAL || '25000'),
  connectTimeout: 10000
})
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  private redisClient = createClient({ url: process.env.REDIS_URL });
  private connectedClients = new Map<string, Socket>();
  private userSockets = new Map<string, string>();
  private heartbeatIntervals = new Map<string, NodeJS.Timeout>();

  private readonly logger = new Logger(UserGateway.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {
    this.redisClient.connect().catch(console.error);
    // Vérification périodique des connexions actives
    const cleanupInterval = parseInt(process.env.SOCKET_CLEANUP_INTERVAL || '30000');
    setInterval(() => this.checkActiveConnections(), cleanupInterval);
  }

  private async checkActiveConnections() {
    try {
      const onlineUsers = await this.redisClient.sMembers('online_users');
      const currentConnectedUsers = Array.from(this.connectedClients.keys());

      // Trouver les utilisateurs qui sont dans Redis mais pas dans les connexions actives
      const disconnectedUsers = onlineUsers.filter(user => !currentConnectedUsers.includes(user));

      // Mettre à jour Redis et Prisma pour les utilisateurs déconnectés
      for (const username of disconnectedUsers) {
        console.log(`[Cleanup] Utilisateur ${username} détecté comme déconnecté`);
        await this.redisClient.sRem('online_users', username);
        await this.prisma.user.update({
          where: { username },
          data: { isOnline: false },
        });
        this.server.emit('user_disconnected', username);
      }

      // Si des utilisateurs ont été déconnectés, diffuser la nouvelle liste
      if (disconnectedUsers.length > 0) {
        const updatedUsers = await this.redisClient.sMembers('online_users');
        this.server.emit('users_list', updatedUsers);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification des connexions:', error);
    }
  }

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token;
      if (!token) {
        client.disconnect();
        return;
      }

      // Le token est déjà vérifié par Next-Auth, on peut le décoder directement
      const decoded = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
      const userId = decoded.userId;

      if (!userId) {
        client.disconnect();
        return;
      }

      client.data.userId = userId;
      await this.redisService.set(`user:${userId}:socket`, client.id);

      this.logger.log(`Client ${client.id} connected as user ${userId}`);
      
      // Stocker les informations de connexion
      this.connectedClients.set(client.id, client);
      this.userSockets.set(userId, client.id);

      // Ajouter l'utilisateur à la liste des utilisateurs en ligne
      await this.redisService.sadd('online_users', userId);

      // Mettre à jour le statut en ligne dans la base de données
      await this.prisma.user.update({
        where: { id: userId },
        data: { isOnline: true }
      });

      // Démarrer le heartbeat pour ce client
      this.startHeartbeat(client.id);

      // Émettre l'événement de changement de statut
      this.server.emit('userStatusChange', { userId, isOnline: true });

    } catch (error) {
      this.logger.error(`Connection error for client ${client.id}:`, error);
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    try {
      const userId = client.data.userId;
      if (!userId) return;

      // Retirer l'utilisateur de la liste des utilisateurs en ligne
      await this.redisService.srem('online_users', userId);
      await this.redisService.del(`user:${userId}:socket`);

      // Mettre à jour le statut hors ligne dans la base de données
      await this.prisma.user.update({
        where: { id: userId },
        data: { isOnline: false }
      });

      // Nettoyer les maps
      this.connectedClients.delete(client.id);
      this.userSockets.delete(userId);

      // Émettre l'événement de changement de statut
      this.server.emit('userStatusChange', { userId, isOnline: false });

    } catch (error) {
      this.logger.error(`Disconnection error for client ${client.id}:`, error);
    }
  }

  @SubscribeMessage('heartbeat')
  handleHeartbeat(@ConnectedSocket() client: Socket) {
    // Répondre au heartbeat
    client.emit('heartbeat');
  }

  private startHeartbeat(clientId: string) {
    const interval = setInterval(() => {
      const client = this.connectedClients.get(clientId);
      if (client?.connected) {
        client.emit('heartbeat');
      } else {
        this.stopHeartbeat(clientId);
      }
    }, 30000); // Envoyer un heartbeat toutes les 30 secondes

    this.heartbeatIntervals.set(clientId, interval);
  }

  private stopHeartbeat(clientId: string) {
    const interval = this.heartbeatIntervals.get(clientId);
    if (interval) {
      clearInterval(interval);
      this.heartbeatIntervals.delete(clientId);
    }
  }

  // Méthode utilitaire pour diffuser la liste des utilisateurs
  private async broadcastUsersList() {
    const users = await this.redisClient.sMembers('online_users');
    this.server.emit('users_list', users);
  }

  @SubscribeMessage('setUsername')
  async handleSetUsername(
    @MessageBody() username: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.data.username = username;
    await this.broadcastUsersList();
  }

  emitNewConversation(conversation: any, userId: string, receiverId: string) {
    this.server.to([userId, receiverId]).emit('newConversation', conversation);
  }
}