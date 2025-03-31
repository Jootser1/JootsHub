import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';

@WebSocketGateway({
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? 'https://joots.app'
      : 'http://localhost:3000',
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinConversation')
  async handleJoinConversation(client: Socket, conversationId: string) {
    client.join(conversationId);
    return { event: 'joinedConversation', data: conversationId };
  }

  @SubscribeMessage('leaveConversation')
  async handleLeaveConversation(client: Socket, conversationId: string) {
    client.leave(conversationId);
    return { event: 'leftConversation', data: conversationId };
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: { conversationId: string; content: string; userId: string }) {
    const { conversationId, content, userId } = payload;

    // Sauvegarder le message dans la base de données
    const message = await this.prisma.message.create({
      data: {
        content,
        sender: {
          connect: {
            id: userId
          }
        },
        conversation: {
          connect: {
            id: conversationId
          }
        }
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });

    // Émettre le message à tous les participants de la conversation
    this.server.to(conversationId).emit('newMessage', message);

    return message;
  }
} 