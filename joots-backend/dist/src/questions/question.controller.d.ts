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
            question: string;
            id: string;
            locale: string;
            groupId: string;
        }[];
        options: {
            id: string;
            locale: string;
            label: string;
            order: number;
            groupId: string;
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
            categoryId: number;
            questionGroupId: string;
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
