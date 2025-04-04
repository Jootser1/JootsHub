import { MessagesService } from './messages.service';
import { Request } from 'express';
interface AuthenticatedRequest extends Request {
    user: {
        sub: string;
    };
}
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    markAsRead(conversationId: string, req: AuthenticatedRequest): Promise<{
        success: boolean;
    }>;
}
export {};
