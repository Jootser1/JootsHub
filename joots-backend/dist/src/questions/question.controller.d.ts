import { QuestionService } from './question.service';
import { IcebreakerService } from '../icebreakers/icebreaker.service';
export declare class QuestionController {
    private readonly questionService;
    private readonly icebreakerService;
    constructor(questionService: QuestionService, icebreakerService: IcebreakerService);
    getQuestionGroup(id: string): Promise<{
        id: string;
        type: number;
        authorId: string;
        createdAt: Date;
        isModerated: boolean;
        moderatedAt: Date | null;
        pinned: boolean;
        enabled: boolean;
    } | null>;
    getNextRandomQuestionGroup(userId1: string, userId2: string): Promise<({
        questions: {
            id: string;
            question: string;
            groupId: string;
            locale: string;
        }[];
        options: {
            id: string;
            groupId: string;
            locale: string;
            label: string;
            order: number;
        }[];
        categories: ({
            category: {
                translations: {
                    locale: string;
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
        type: number;
        authorId: string;
        createdAt: Date;
        isModerated: boolean;
        moderatedAt: Date | null;
        pinned: boolean;
        enabled: boolean;
    }) | null>;
    postResponseToQuestion(body: {
        userId: string;
        questionGroupId: string;
        optionId: string;
        conversationId: string;
    }): Promise<{
        id: string;
        questionGroupId: string;
        userId: string;
        questionOptionId: string;
        conversationId: string | null;
        answeredAt: Date;
        updatedAt: Date;
        note: string | null;
        isFlagged: boolean;
    }>;
}
