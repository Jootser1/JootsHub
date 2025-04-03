import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
export declare class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly prisma;
    private readonly redis;
    server: Server;
    private readonly logger;
    private connectedUsers;
    constructor(prisma: PrismaService, redis: RedisService);
    afterInit(server: Server): void;
    private extractUserIdFromToken;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    handleUpdateUserStatus(client: Socket, data: {
        isOnline: boolean;
    }): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
    handlePong(client: Socket): void;
}
