import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QuestionGroupWithRelations } from '../../types/question';
export declare class QuestionService {
    private readonly prisma;
    private readonly redis;
    constructor(prisma: PrismaService, redis: RedisService);
    getUserLastResponseToQuestion(currentUserId: string, questionGroupId: string): Promise<({
        questionOption: {
            id: string;
            locale: string;
            label: string;
            order: number;
            groupId: string;
        };
    } & {
        id: string;
        updatedAt: Date;
        userId: string;
        conversationId: string | null;
        questionGroupId: string;
        questionOptionId: string;
        answeredAt: Date;
        note: string | null;
        isFlagged: boolean;
    }) | null>;
    getQuestionGroup(questionGroupId: string): Promise<{
        id: string;
        type: number;
        authorId: string;
        createdAt: Date;
        isModerated: boolean;
        moderatedAt: Date | null;
        pinned: boolean;
        enabled: boolean;
    } | null>;
    getNextRandomQuestionGroup(userId1: string, userId2: string): Promise<QuestionGroupWithRelations | null>;
    saveResponse(userId: string, questionGroupId: string, optionId: string, conversationId: string): Promise<{
        id: string;
        updatedAt: Date;
        userId: string;
        conversationId: string | null;
        questionGroupId: string;
        questionOptionId: string;
        answeredAt: Date;
        note: string | null;
        isFlagged: boolean;
    }>;
}
