import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
export declare class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly prisma;
    private readonly redisService;
    server: Server;
    private redisClient;
    private connectedClients;
    private userSockets;
    private heartbeatIntervals;
    private readonly logger;
    constructor(prisma: PrismaService, redisService: RedisService);
    private checkActiveConnections;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    handleHeartbeat(client: Socket): void;
    private startHeartbeat;
    private stopHeartbeat;
    private broadcastUsersList;
    handleSetUsername(username: string, client: Socket): Promise<void>;
    emitNewConversation(conversation: any, userId: string, receiverId: string): void;
}
