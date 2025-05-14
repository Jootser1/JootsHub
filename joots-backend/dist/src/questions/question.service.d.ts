import { PrismaService } from '../../prisma/prisma.service';
import { QuestionGroupWithRelations } from '../../types/question';
import { IcebreakerService } from '../icebreakers/icebreaker.service';
export declare class QuestionService {
    private readonly prisma;
    private readonly icebreakerService;
    constructor(prisma: PrismaService, icebreakerService: IcebreakerService);
    getUserLastResponseToQuestion(currentUserId: string, questionGroupId: string): Promise<({
        questionOption: {
            id: string;
            locale: import("@prisma/client").$Enums.LocaleCode;
            groupId: string;
            label: string;
            order: number;
        };
    } & {
        id: string;
        conversationId: string | null;
        updatedAt: Date;
        userId: string;
        questionGroupId: string;
        questionOptionId: string;
        answeredAt: Date;
        note: string | null;
        isFlagged: boolean;
    }) | null>;
    getQuestionGroup(questionGroupId: string): Promise<{
        id: string;
        createdAt: Date;
        type: number;
        authorId: string;
        isModerated: boolean;
        moderatedAt: Date | null;
        pinned: boolean;
        enabled: boolean;
    } | null>;
    getNextRandomQuestionGroup(userId1: string, userId2: string): Promise<QuestionGroupWithRelations | null>;
    saveResponse(userId: string, questionGroupId: string, optionId: string, conversationId: string): Promise<{
        id: string;
        conversationId: string | null;
        updatedAt: Date;
        userId: string;
        questionGroupId: string;
        questionOptionId: string;
        answeredAt: Date;
        note: string | null;
        isFlagged: boolean;
    }>;
    saveUserAnswer(userId: string, questionGroupId: string, optionId: string, conversationId: string): Promise<{
        id: string;
        conversationId: string | null;
        updatedAt: Date;
        userId: string;
        questionGroupId: string;
        questionOptionId: string;
        answeredAt: Date;
        note: string | null;
        isFlagged: boolean;
    }>;
}
