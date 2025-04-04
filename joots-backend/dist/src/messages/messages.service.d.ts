import { PrismaService } from '../../prisma/prisma.service';
export declare class MessagesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    markAsRead(conversationId: string, userId: string): Promise<{
        success: boolean;
    }>;
}
