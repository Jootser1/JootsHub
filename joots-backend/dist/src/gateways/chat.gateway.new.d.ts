import { Socket } from 'socket.io';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseGateway } from './base.gateway';
export declare class ChatGateway extends BaseGateway {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
