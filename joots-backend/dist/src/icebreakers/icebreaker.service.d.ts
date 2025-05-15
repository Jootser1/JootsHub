import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QuestionGroupWithRelations } from '../../types/question';
import { ChatGateway } from '../gateways/chat.gateway';
import { MessagesService } from '../messages/messages.service';
export declare class IcebreakerService {
    private readonly prisma;
    private readonly redis;
    private readonly chatGateway;
    private readonly messagesService;
    constructor(prisma: PrismaService, redis: RedisService, chatGateway: ChatGateway, messagesService: MessagesService);
    setParticipantIcebreakerReady(conversationId: string, userId: string, isIcebreakerReady: boolean): Promise<void>;
    areAllParticipantsReady(conversationId: string): Promise<boolean>;
    areAllParticipantsHaveGivenAnswer(conversationId: string): Promise<{
        allParticipantsHaveGivenAnswer: boolean;
        userAId: string;
        userBId: string;
    }>;
    storeCurrentQuestionGroupForAGivenConversation(conversationId: string, questionGroup: QuestionGroupWithRelations): Promise<void>;
    processIcebreakersPostResponses(userId: string, questionGroupId: string, optionId: string, conversationId: string): Promise<void>;
    private saveCurrentUserResponseInRedis;
    private updateParticipantsHasGivenAnswerStatus;
    private processCompletedIcebreaker;
    private getUserAnswers;
    private formatUserAnswersForAddIcebreakerMessage;
    private addIcebreakerMessage;
    private resetIcebreakerStatus;
    emitResponsesToAllParticipants(conversationId: string, questionLabel: string, userAnswerA: {
        userId: string;
        questionOption: string;
    }, userAnswerB: {
        userId: string;
        questionOption: string;
    }): Promise<void>;
}
