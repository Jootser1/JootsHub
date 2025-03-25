import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../../prisma/prisma.service';
export declare class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private prisma;
    server: Server;
    private redisClient;
    private connectedClients;
    constructor(prisma: PrismaService);
    private checkActiveConnections;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    private broadcastUsersList;
    handleSetUsername(username: string, client: Socket): Promise<void>;
}
