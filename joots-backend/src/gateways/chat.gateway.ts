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
import { HeartbeatService } from './services/heartbeat.service';
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
  namespace: 'chat',
  transports: ['websocket', 'polling'],
  pingTimeout: parseInt(process.env.SOCKET_PING_TIMEOUT || '60000'),
  pingInterval: parseInt(process.env.SOCKET_PING_INTERVAL || '25000'),
  connectTimeout: 10000
})

export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  private readonly logger = new Logger(ChatGateway.name);
  private heartbeatIntervals = new Map<string, NodeJS.Timeout>();

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly heartbeatService: HeartbeatService,
  ) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
    this.heartbeatService.startHeartbeat(client);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.heartbeatService.stopHeartbeat(client);
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

  @SubscribeMessage('pong')
  handlePong(client: Socket) {
    this.heartbeatService.handlePong(client);
  }
} 