import { PrismaService } from '../../prisma/prisma.service';
interface IcebreakerUserAnswer {
    userId: string;
    questionOption: string;
}
export declare class MessagesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    markAsRead(conversationId: string, userId: string): Promise<{
        success: boolean;
    }>;
    addIcebreakerMessage(conversationId: string, questionLabel: string, userAnswerA: IcebreakerUserAnswer, userAnswerB: IcebreakerUserAnswer): Promise<void>;
}
export {};
