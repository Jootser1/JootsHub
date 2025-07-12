import { Socket } from 'socket.io';
import { PrismaService } from '../prisma/prisma.service';
import { BaseGateway } from './base.gateway';
import { RedisService } from '../redis/redis.service';
import { QuestionService } from '../questions/question.service';
import { IcebreakerService } from '../icebreakers/icebreaker.service';
import { xp_and_level } from '@shared/conversation.types';
import { ConversationsService } from 'src/conversations/conversations.service';
export declare class ChatGateway extends BaseGateway {
    private readonly prisma;
    private readonly redis;
    private readonly questionService;
    private readonly icebreakerService;
    private readonly conversationsService;
    constructor(prisma: PrismaService, redis: RedisService, questionService: QuestionService, icebreakerService: IcebreakerService, conversationsService: ConversationsService);
    private userChatSockets;
    private chatSocketUsers;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): Promise<void>;
    handleJoinConversation(client: Socket, data: {
        conversation_id: string;
        user_id: string;
    }): {
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    };
    handleLeaveConversation(client: Socket, data: {
        conversation_id: string;
        user_id: string;
    }): {
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    };
    handleSendMessage(client: Socket, data: {
        conversation_id: string;
        content: string;
        user_id: string;
    }): Promise<{
        success: boolean;
        message: any;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message?: undefined;
    }>;
    handleTyping(client: Socket, data: {
        conversation_id: string;
        user_id: string;
        is_typing: boolean;
    }): {
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    };
    handleIcebreakerReady(client: Socket, data: {
        conversation_id: string;
        user_id: string;
        is_icebreaker_ready: boolean;
    }): Promise<{
        success: boolean;
        userId: string;
        is_icebreaker_ready: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        userId?: undefined;
        is_icebreaker_ready?: undefined;
    }>;
    private emitIcebreakerStatusUpdate;
    private triggerIcebreakerQuestion;
    private emitNextPolltoParticipants;
    emitIcebreakerResponsesToAllParticipants(conversation_id: string, questionLabel: string, user1: string, response1: string, user2: string, response2: string, xpAndLevel: xp_and_level): Promise<void>;
    private joinUserConversations;
    private synchronizeConversationState;
    private synchronizeIcebreakerQuestion;
    private synchronizeParticipantStatuses;
    private synchronizeIcebreakerResponses;
}
