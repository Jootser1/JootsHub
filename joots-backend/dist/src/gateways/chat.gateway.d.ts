import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../../prisma/prisma.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly prisma;
    server: Server;
    private readonly logger;
    constructor(prisma: PrismaService);
    afterInit(server: Server): void;
    private extractUserIdFromToken;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinConversation(client: Socket, conversationId: string): {
        success: boolean;
    };
    handleLeaveConversation(client: Socket, conversationId: string): {
        success: boolean;
    };
    handleSendMessage(client: Socket, data: {
        conversationId: string;
        content: string;
        userId: string;
    }): Promise<{
        success: boolean;
        message: {
            sender: {
                id: string;
                avatar: string | null;
                username: string;
            };
        } & {
            id: string;
            createdAt: Date;
            conversationId: string;
            content: string;
            senderId: string;
            editedAt: Date | null;
            isRead: boolean;
            isDeleted: boolean;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message?: undefined;
    }>;
    handleIcebreakerReady(client: Socket, conversationId: string): {
        success: boolean;
    };
    handleIcebreakerResponse(client: Socket, data: {
        conversationId: string;
        response: any;
    }): {
        success: boolean;
    };
}
