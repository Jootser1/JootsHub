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


@WebSocketGateway(4001,{ cors: { origin: '*' } })
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  private redisClient = createClient({ url: process.env.REDIS_URL });

  constructor(private prisma: PrismaService) {
    this.redisClient.connect().catch(console.error);
  }

  async handleConnection(client: Socket) {
    try {
      const { token } = client.handshake.auth;
      console.log("token dans user gateway", token);
      if (!token) throw new Error("Token manquant");

      // Vérifier et décoder le JWT
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      const username = decoded.username;
      console.log("username dans user gateway", username);
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
