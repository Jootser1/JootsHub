import { Socket } from 'socket.io';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseGateway } from './base.gateway';
import { RedisService } from '../redis/redis.service';
import { QuestionService } from '../questions/question.service';
import { IcebreakerService } from '../icebreakers/icebreaker.service';
export declare class ChatGateway extends BaseGateway {
    private readonly prisma;
    private readonly redis;
    private readonly questionService;
    private readonly icebreakerService;
    constructor(prisma: PrismaService, redis: RedisService, questionService: QuestionService, icebreakerService: IcebreakerService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinConversation(client: Socket, data: {
        conversationId: string;
        userId: string;
    }): {
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    };
    handleLeaveConversation(client: Socket, data: {
        conversationId: string;
        userId: string;
    }): {
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    };
    handleSendMessage(client: Socket, data: {
        conversationId: string;
        content: string;
        userId: string;
    }): Promise<{
        success: boolean;
        message: {
            conversationId: string;
            createdAt: Date;
            sender: {
                id: string;
                username: string;
                avatar: string | null;
            };
            id: string;
            senderId: string;
            content: string;
            editedAt: Date | null;
            isRead: boolean;
            isDeleted: boolean;
            messageType: import("@prisma/client").$Enums.MessageType;
            userAId: string | null;
            userAAnswer: string | null;
            userBId: string | null;
            userBAnswer: string | null;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message?: undefined;
    }>;
    handleTyping(client: Socket, data: {
        conversationId: string;
        userId: string;
        isTyping: boolean;
    }): {
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    };
    handleIcebreakerReady(client: Socket, data: {
        conversationId: string;
        userId: string;
        isIcebreakerReady: boolean;
    }): Promise<{
        success: boolean;
        userId: string;
        isIcebreakerReady: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        userId?: undefined;
        isIcebreakerReady?: undefined;
    }>;
    private emitIcebreakerStatusUpdate;
    private triggerIcebreakerQuestion;
    emitIcebreakerResponsesToAllParticipants(conversationId: string, questionGroupId: string, userId1: string, optionId1: string, userId2: string, optionId2: string): Promise<void>;
    private joinUserConversations;
    private synchronizeConversationState;
}
