import { Socket } from 'socket.io';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { BaseGateway } from './base.gateway';
export declare class UserGateway extends BaseGateway {
    private readonly prisma;
    private readonly redis;
    constructor(prisma: PrismaService, redis: RedisService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    private notifyContactsStatusChange;
    handleJoinContactsRooms(client: Socket, payload: {
        contactIds: string[];
    }): Promise<void>;
    handleLeaveContactsRooms(client: Socket, payload: {
        contactIds: string[];
    }): Promise<void>;
    handlePong(client: Socket): Promise<void>;
    handleUpdateUserStatus(client: Socket, payload: {
        isOnline: boolean;
    }): Promise<void>;
}
