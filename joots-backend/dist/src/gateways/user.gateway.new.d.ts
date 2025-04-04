import { Socket } from 'socket.io';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { BaseGateway } from './base.gateway';
export declare class UserGateway extends BaseGateway {
    private readonly prisma;
    private readonly redis;
    private connectedUsers;
    constructor(prisma: PrismaService, redis: RedisService);
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
