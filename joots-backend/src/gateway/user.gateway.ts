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
  private redisClient = createClient({ url: process.env.REDIS_URL });  // Connect to Redis

  constructor(private prisma: PrismaService) {
    this.redisClient.connect().catch(console.error);
  }

  async handleConnection(client: Socket) {
    const userToken = client.handshake.auth.token as string;
    const decoded: any = jwt.verify(userToken, process.env.JWT_SECRET as string);
    const username = decoded.username;
    console.log("username dans user gateway", username);

    if (username) {
      await this.redisClient.sAdd('onlineUsers', username);
      await this.prisma.user.update({
        where: { username: username },
        data: { isOnline: true },
      });
      await this.broadcastUsers();
    }
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client déconnecté: ${client.id}`);
    const userId = client.handshake.query.userId as string;

    if (userId) {
      await this.redisClient.sRem('onlineUsers', userId);
      await this.prisma.user.update({
        where: { id: userId },
        data: { isOnline: false },
      });
      await this.broadcastUsers();
    }
  }

  private async broadcastUsers() {
    const users = await this.redisClient.sMembers('onlineUsers');
    this.server.emit('activeUsers', users);
  }

  @SubscribeMessage('setUsername')
  async handleSetUsername(
    @MessageBody() username: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.data.username = username;
    await this.broadcastUsers();
  }
}
