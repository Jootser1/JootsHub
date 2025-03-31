import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private prisma;
    private redis;
    server: Server;
    constructor(prisma: PrismaService, redis: RedisService);
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
        isRead: boolean;
        conversationId: string;
    }>;
}
