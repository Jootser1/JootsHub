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
import { RedisService } from '../redis/redis.service';
import { Logger } from '@nestjs/common';
import { HeartbeatService } from './services/heartbeat.service';

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

  private readonly logger = new Logger(UserGateway.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
    private readonly heartbeatService: HeartbeatService,
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
      const disconnectedUsers = onlineUsers.filter(userId => !currentConnectedUsers.includes(userId));

      // Mettre à jour Redis et Prisma pour les utilisateurs déconnectés
      for (const userId of disconnectedUsers) {
        await this.redisClient.sRem('online_users', userId);
        
        try {
          await this.prisma.user.update({
            where: { id: userId },
            data: { isOnline: false }
          });
        } catch (error) {
          if (error.code === 'P2025') {
            this.logger.warn(`Utilisateur ${userId} non trouvé dans la base de données`);
          } else {
            throw error;
          }
        }
      }

      // Si des utilisateurs ont été déconnectés, diffuser la nouvelle liste
      if (disconnectedUsers.length > 0) {
        const updatedUsers = await this.redisClient.sMembers('online_users');
        this.server.emit('users_list', updatedUsers);
      }
    } catch (error) {
      this.logger.error('Erreur lors de la vérification des connexions:', error);
    }
  }

  private getUserInfo(client: Socket): string {
    const userId = client.data?.userId || 'unknown';
    const username = client.data?.username || 'unknown';
    return `[User: ${username} (${userId})]`;
  }

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token;
      if (!token) {
        this.logger.warn(`Tentative de connexion sans token - client ${client.id}`);
        client.disconnect();
        return;
      }

      try {
        // Le token est déjà vérifié par Next-Auth, on peut le décoder directement
        const tokenParts = token.split('.');
        if (tokenParts.length !== 3) {
          this.logger.error(`Format de token invalide - nombre de parties: ${tokenParts.length}`);
          client.disconnect();
          return;
        }

        const base64Payload = tokenParts[1];
        const decodedString = Buffer.from(base64Payload, 'base64').toString();
        const decoded = JSON.parse(decodedString);

        // Vérification explicite de la présence des champs requis
        if (!decoded.sub) {
          this.logger.error('Token invalide: champ "sub" manquant');
          client.disconnect();
          return;
        }

        // Utilisation explicite du champ sub comme userId (standard Next-Auth)
        const userId = decoded.sub;
        const username = decoded.username; // Optionnel, peut être utile plus tard      

        // Vérification de l'expiration
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp && decoded.exp < now) {
          this.logger.warn('Token expiré');
          client.disconnect();
          return;
        }

        // Vérifier si l'utilisateur a déjà une connexion active
        const existingSocketId = this.userSockets.get(userId);
        if (existingSocketId) {
          const existingSocket = this.connectedClients.get(existingSocketId);
          if (existingSocket?.connected) {
            this.logger.warn(`Utilisateur ${username} (${userId}) déjà connecté, déconnexion de l'ancienne session`);
            existingSocket.disconnect();
          }
        }

        client.data.userId = userId;
        if (username) {
          client.data.username = username;
        }
        await this.redisService.set(`user:${userId}:socket`, client.id);

        this.logger.log(`Client ${client.id} ${this.getUserInfo(client)} connecté`);
        
        // Stocker les informations de connexion
        this.connectedClients.set(client.id, client);
        this.userSockets.set(userId, client.id);

        // Ajouter l'utilisateur à la liste des utilisateurs en ligne
        await this.redisService.sadd('online_users', userId);
        this.heartbeatService.startHeartbeat(client);

        // Récupérer les informations de l'utilisateur pour l'événement
        const user = await this.prisma.user.findUnique({
          where: { id: userId },
          select: { username: true, avatar: true }
        });

        // Émettre l'événement de connexion avec plus de détails
        this.server.emit('userStatusChange', {
          userId,
          isOnline: true,
          timestamp: new Date().toISOString(),
          username: user?.username,
          avatar: user?.avatar,
          eventType: 'connection'
        });

        // Notifier uniquement l'utilisateur connecté
        client.emit('connectionSuccess', {
          message: 'Connexion réussie',
          userId,
          socketId: client.id
        });

      } catch (error) {
        this.logger.error(`Erreur de connexion pour le client ${client.id}:`, error);
        client.emit('connectionError', {
          message: 'Erreur lors de la connexion',
          details: error.message
        });
        client.disconnect();
      }
    } catch (error) {
      this.logger.error(`Erreur de connexion pour le client ${client.id}:`, error);
      client.emit('connectionError', {
        message: 'Erreur lors de la connexion',
        details: error.message
      });
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    try {
      const userId = client.data?.userId;
      const userInfo = this.getUserInfo(client);
      
      this.logger.warn(`Déconnexion du client ${client.id} ${userInfo}`);

      if (!userId) {
        this.logger.warn(`Déconnexion d'un client non identifié: ${client.id}`);
        return;
      }

      // Vérifier si c'est bien le dernier socket de l'utilisateur
      const currentSocketId = this.userSockets.get(userId);
      if (currentSocketId !== client.id) {
        this.logger.debug(`Socket ${client.id} n'est pas le dernier socket actif pour l'utilisateur ${userId}`);
        return;
      }

      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { username: true, avatar: true }
      });

      // Retirer l'utilisateur de la liste des utilisateurs en ligne
      await this.redisService.srem('online_users', userId);
      await this.redisService.del(`user:${userId}:socket`);

      this.connectedClients.delete(client.id);
      this.userSockets.delete(userId);

      const disconnectEvent = {
        userId,
        isOnline: false,
        timestamp: new Date().toISOString(),
        username: user?.username,
        avatar: user?.avatar,
        eventType: 'disconnection',
        reason: client.disconnected ? 'client_disconnected' : 'unknown'
      };

      this.logger.debug('Émission de l\'événement de déconnexion:', disconnectEvent.username);
      this.server.emit('userStatusChange', disconnectEvent);

      this.heartbeatService.stopHeartbeat(client);

    } catch (error) {
      this.logger.error(`Erreur lors de la déconnexion du client ${client.id}:`, error);
      this.server.emit('userStatusChange', {
        userId: client.data?.userId,
        isOnline: false,
        timestamp: new Date().toISOString(),
        eventType: 'disconnection',
        error: true
      });
    }
  }

  @SubscribeMessage('pong')
  handlePong(@ConnectedSocket() client: Socket) {
    this.heartbeatService.handlePong(client);
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