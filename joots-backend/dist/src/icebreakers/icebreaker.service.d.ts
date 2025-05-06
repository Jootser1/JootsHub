import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QuestionGroupWithRelations } from '../../types/question';
export declare class IcebreakerService {
    private readonly prisma;
    private readonly redis;
    constructor(prisma: PrismaService, redis: RedisService);
    setParticipantIcebreakerReady(conversationId: string, userId: string, isIcebreakerReady: boolean): Promise<void>;
    areAllParticipantsReady(conversationId: string): Promise<boolean>;
    storeCurrentQuestionGroupForAGivenConversation(conversationId: string, questionGroup: QuestionGroupWithRelations): Promise<void>;
}
