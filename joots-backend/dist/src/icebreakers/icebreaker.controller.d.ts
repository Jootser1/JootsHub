import { IcebreakerService } from './icebreaker.service';
import { QuestionService } from 'src/questions/question.service';
export declare class IcebreakerController {
    private readonly icebreakerService;
    private readonly questionService;
    constructor(icebreakerService: IcebreakerService, questionService: QuestionService);
    postResponseToQuestion(body: {
        userId: string;
        questionGroupId: string;
        optionId: string;
        conversationId?: string;
    }): Promise<{
        id: string;
        userId: string;
        questionGroupId: string;
        questionOptionId: string;
        conversationId: string | null;
        answeredAt: Date;
        updatedAt: Date;
        note: string | null;
        isFlagged: boolean;
    }>;
}
