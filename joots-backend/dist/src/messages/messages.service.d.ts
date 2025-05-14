import { PrismaService } from '../../prisma/prisma.service';
import { UserAnswer } from '@prisma/client';
export declare class MessagesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    markAsRead(conversationId: string, userId: string): Promise<{
        success: boolean;
    }>;
    addIcebreakerMessage(conversationId: string, questionLabel: string, userAnswerA: UserAnswer, userAnswerB: UserAnswer): Promise<void>;
}
