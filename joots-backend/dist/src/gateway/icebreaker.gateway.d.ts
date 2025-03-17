import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
export declare class IcebreakerGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private redisClient;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
}
