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
})
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  private redisClient = createClient({ url: process.env.REDIS_URL });
  private connectedClients = new Map<string, Socket>();

  constructor(private prisma: PrismaService) {
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
      const { token } = client.handshake.auth;
      if (!token) throw new Error("Token manquant");

      // Vérifier et décoder le JWT
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      const username = decoded.username;

      // Stocker la connexion dans la Map
      this.connectedClients.set(username, client);

      // Stocker dans Redis et mettre à jour Prisma
      await this.redisClient.sAdd('online_users', username);
      await this.prisma.user.update({
        where: { username },
        data: { isOnline: true },
      });

      // Notifier les autres utilisateurs
      this.server.emit('user_connected', username);

      // Envoyer la liste des utilisateurs connectés
      const users = await this.redisClient.sMembers('online_users');
      client.emit('users_list', users);

    } catch (error) {
      console.error('Erreur de connexion:', error);
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    try {
      const { token } = client.handshake.auth;
      if (!token) return;

      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      const username = decoded.username;

      // Retirer de la Map des connexions actives
      this.connectedClients.delete(username);

      // Mettre à jour Redis et Prisma
      await this.redisClient.sRem('online_users', username);
      await this.prisma.user.update({
        where: { username },
        data: { isOnline: false },
      });

      // Notifier les autres utilisateurs
      this.server.emit('user_disconnected', username);
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
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
}
