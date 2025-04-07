import { Socket } from 'socket.io';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { BaseGateway } from './base.gateway';
import { UserContactsService } from 'src/users/contacts/contacts.service';
export declare class UserGateway extends BaseGateway {
    private readonly prisma;
    private readonly redis;
    private readonly userContactsService;
    private connectedUsers;
    constructor(prisma: PrismaService, redis: RedisService, userContactsService: UserContactsService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    private notifyContactsStatusChange;
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
