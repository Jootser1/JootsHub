import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { HeartbeatService } from './services/heartbeat.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly prisma;
    private readonly redis;
    private readonly heartbeatService;
    server: Server;
    private readonly logger;
    private heartbeatIntervals;
    constructor(prisma: PrismaService, redis: RedisService, heartbeatService: HeartbeatService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleJoinConversation(client: Socket, conversationId: string): Promise<{
        event: string;
        data: string;
    }>;
    handleLeaveConversation(client: Socket, conversationId: string): Promise<{
        event: string;
        data: string;
    }>;
    handleMessage(client: Socket, payload: {
        conversationId: string;
        content: string;
        userId: string;
    }): Promise<{
        sender: {
            id: string;
            username: string;
            avatar: string | null;
        };
    } & {
        id: string;
        senderId: string;
        content: string;
        createdAt: Date;
        editedAt: Date | null;
        isRead: boolean;
        isDeleted: boolean;
        conversationId: string;
    }>;
    handlePong(client: Socket): void;
}
