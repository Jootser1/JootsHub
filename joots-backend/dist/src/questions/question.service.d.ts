import { PrismaService } from '../prisma/prisma.service';
import { CurrentPollWithRelations } from '@shared/question.types';
import { IcebreakerService } from '../icebreakers/icebreaker.service';
import { postedResponse } from '@shared/icebreaker.types';
import { ConversationsService } from 'src/conversations/conversations.service';
export declare class QuestionService {
    private readonly prisma;
    private readonly icebreakerService;
    private readonly conversationsService;
    constructor(prisma: PrismaService, icebreakerService: IcebreakerService, conversationsService: ConversationsService);
    getUserLastResponseToQuestion(currentUserId: string, pollId: string): Promise<any>;
    getPoll(pollId: string): Promise<any>;
    getNextRandomPoll(conversationId: string, userId1: string, userId2: string): Promise<CurrentPollWithRelations | null>;
    saveUserAnswerInDB(response: postedResponse): Promise<any>;
}
