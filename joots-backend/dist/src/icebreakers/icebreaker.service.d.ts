import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QuestionGroupWithRelations } from '../../types/question';
import { ChatGateway } from '../gateways/chat.gateway';
export declare class IcebreakerService {
    private readonly prisma;
    private readonly redis;
    private readonly chatGateway;
    constructor(prisma: PrismaService, redis: RedisService, chatGateway: ChatGateway);
    setParticipantIcebreakerReady(conversationId: string, userId: string, isIcebreakerReady: boolean): Promise<void>;
    areAllParticipantsReady(conversationId: string): Promise<boolean>;
    areAllParticipantsHaveGivenAnswer(conversationId: string): Promise<boolean>;
    storeCurrentQuestionGroupForAGivenConversation(conversationId: string, questionGroup: QuestionGroupWithRelations): Promise<void>;
    processIcebreakersPostResponses(userId: string, questionGroupId: string, optionId: string, conversationId: string): Promise<void>;
    emitResponsesToAllParticipants(conversationId: string, questionGroupId: string): Promise<void>;
}
