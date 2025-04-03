import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { HeartbeatService } from './services/heartbeat.service';
export declare class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly prisma;
    private readonly redisService;
    private readonly heartbeatService;
    server: Server;
    private redisClient;
    private connectedClients;
    private userSockets;
    private readonly logger;
    constructor(prisma: PrismaService, redisService: RedisService, heartbeatService: HeartbeatService);
    private checkActiveConnections;
    private getUserInfo;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    handlePong(client: Socket): void;
    private broadcastUsersList;
    handleSetUsername(username: string, client: Socket): Promise<void>;
    emitNewConversation(conversation: any, userId: string, receiverId: string): void;
}
