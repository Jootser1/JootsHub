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

@WebSocketGateway(4001,{ cors: { origin: '*' } })
export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  private redisClient = createClient({ url: 'redis://localhost:6379' });

  constructor(private prisma: PrismaService) {
    this.redisClient.connect().catch(console.error);
  }

  async handleConnection(client: Socket) {
    console.log(`Client connecté: ${client.id}`);
    const userId = client.handshake.query.userId as string;

    if (userId) {
      await this.redisClient.sAdd('onlineUsers', userId);
      await this.prisma.user.update({
        where: { id: userId },
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
