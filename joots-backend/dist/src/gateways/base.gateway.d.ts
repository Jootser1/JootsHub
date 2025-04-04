import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
export declare abstract class BaseGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    protected readonly logger: Logger;
    constructor(name: string);
    afterInit(server: Server): void;
    protected extractUserIdFromToken(token: string): string | null;
    abstract handleConnection(client: Socket): void;
    abstract handleDisconnect(client: Socket): void;
}
