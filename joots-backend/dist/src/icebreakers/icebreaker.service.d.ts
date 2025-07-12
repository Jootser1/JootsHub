import { Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { CurrentPollWithRelations } from '@shared/poll.types';
import { ChatGateway } from '../gateways/chat.gateway';
import { MessagesService } from '../messages/messages.service';
import { ConversationsService } from '../conversations/conversations.service';
import { xp_and_level } from '@shared/conversation.types';
import { postedResponse } from '@shared/icebreaker.types';
export declare class IcebreakerService {
    private readonly prisma;
    private readonly redis;
    private readonly chatGateway;
    private readonly messagesService;
    private readonly conversationsService;
    private readonly logger;
    constructor(prisma: PrismaService, redis: RedisService, chatGateway: ChatGateway, messagesService: MessagesService, conversationsService: ConversationsService, logger: Logger);
    updateParticipantIcebreakerReady(conversationId: string, userId: string, isIcebreakerReady: boolean): Promise<void>;
    areAllParticipantsReady(conversationId: string): Promise<boolean>;
    private updateParticipantsHasGivenAnswerStatus;
    areAllParticipantsHaveGivenAnswer(conversationId: string): Promise<{
        allParticipantsHaveGivenAnswer: boolean;
        userAId: string;
        userBId: string;
    }>;
    storeCurrentPollForAGivenConversation(conversationId: string, poll: CurrentPollWithRelations): Promise<void>;
    processIcebreakersPostResponse(postedResponse: postedResponse): Promise<void>;
    private saveCurrentUserResponseInRedis;
    private processCompletedBothIcebreakers;
    emitResponsesToAllParticipants(conversationId: string, questionLabel: string, userAnswerA: {
        userId: string;
        questionOption: string;
    }, userAnswerB: {
        userId: string;
        questionOption: string;
    }, xpAndLevel: xp_and_level): Promise<void>;
    private getUserAnswers;
    private resetIcebreakerStatus;
}
