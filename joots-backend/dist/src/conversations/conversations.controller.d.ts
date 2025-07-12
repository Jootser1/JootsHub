import { ConversationsService } from './conversations.service';
import { Request } from 'express';
interface AuthenticatedRequest extends Request {
    user: {
        sub: string;
    };
}
export declare class ConversationsController {
    private readonly conversationsService;
    constructor(conversationsService: ConversationsService);
    findAll(req: AuthenticatedRequest): Promise<{
        conversation_id: string;
        created_at: Date;
        updated_at: Date;
        locale: import(".prisma/client").$Enums.LocaleCode;
        xp_point: number;
        difficulty: import(".prisma/client").$Enums.Difficulty;
        current_poll_id: string | null;
    }[]>;
    findOne(id: string, req: AuthenticatedRequest): Promise<{
        conversation_id: string;
        created_at: Date;
        updated_at: Date;
        locale: import(".prisma/client").$Enums.LocaleCode;
        xp_point: number;
        difficulty: import(".prisma/client").$Enums.Difficulty;
        current_poll_id: string | null;
    }>;
    findMessages(id: string, req: AuthenticatedRequest): Promise<{
        conversation_id: string;
        created_at: Date;
        message_id: string;
        sender_id: string;
        content: string;
        status: import(".prisma/client").$Enums.MessageStatus;
    }[]>;
    create(body: {
        receiverId: string;
    }, req: AuthenticatedRequest): Promise<{
        conversation_id: string;
        created_at: Date;
        updated_at: Date;
        locale: import(".prisma/client").$Enums.LocaleCode;
        xp_point: number;
        difficulty: import(".prisma/client").$Enums.Difficulty;
        current_poll_id: string | null;
    }>;
}
export {};
