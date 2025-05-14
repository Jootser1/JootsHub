import { QuestionService } from './question.service';
import { IcebreakerService } from '../icebreakers/icebreaker.service';
export declare class QuestionController {
    private readonly questionService;
    private readonly icebreakerService;
    constructor(questionService: QuestionService, icebreakerService: IcebreakerService);
    getQuestionGroup(id: string): Promise<{
        id: string;
        createdAt: Date;
        type: number;
        authorId: string;
        isModerated: boolean;
        moderatedAt: Date | null;
        pinned: boolean;
        enabled: boolean;
    } | null>;
    getNextRandomQuestionGroup(userId1: string, userId2: string): Promise<({
        questions: {
            id: string;
            locale: import("@prisma/client").$Enums.LocaleCode;
            question: string;
            groupId: string;
        }[];
        options: {
            id: string;
            locale: import("@prisma/client").$Enums.LocaleCode;
            groupId: string;
            label: string;
            order: number;
        }[];
        categories: ({
            category: {
                translations: {
                    locale: import("@prisma/client").$Enums.LocaleCode;
                    label: string;
                    categoryId: number;
                }[];
            } & {
                id: number;
            };
        } & {
            questionGroupId: string;
            categoryId: number;
        })[];
    } & {
        id: string;
        createdAt: Date;
        type: number;
        authorId: string;
        isModerated: boolean;
        moderatedAt: Date | null;
        pinned: boolean;
        enabled: boolean;
    }) | null>;
    postResponseToQuestion(body: {
        userId: string;
        questionGroupId: string;
        optionId: string;
        conversationId?: string;
    }): Promise<{
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
