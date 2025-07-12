import { QuestionService } from './question.service';
import { IcebreakerService } from '../icebreakers/icebreaker.service';
export declare class QuestionController {
    private readonly questionService;
    private readonly icebreakerService;
    constructor(questionService: QuestionService, icebreakerService: IcebreakerService);
    getQuestionGroup(id: string): Promise<any>;
    getNextRandomQuestionGroup(userId1: string, userId2: string): Promise<any>;
    postResponseToQuestion(body: {
        userId: string;
        questionGroupId: string;
        optionId: string;
        conversationId: string;
    }): Promise<any>;
}
