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
    findAll(req: AuthenticatedRequest): Promise<({
        messages: {
            id: string;
            createdAt: Date;
            senderId: string;
            content: string;
            isRead: boolean;
            conversationId: string;
        }[];
        initiator: {
            id: string;
            avatar: string | null;
            username: string;
            isOnline: boolean;
        };
        receiver: {
            id: string;
            avatar: string | null;
            username: string;
            isOnline: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        initiatorId: string;
        receiverId: string;
    })[]>;
    findOne(id: string, req: AuthenticatedRequest): Promise<{
        messages: {
            id: string;
            createdAt: Date;
            senderId: string;
            content: string;
            isRead: boolean;
            conversationId: string;
        }[];
        initiator: {
            id: string;
            avatar: string | null;
            username: string;
            isOnline: boolean;
        };
        receiver: {
            id: string;
            avatar: string | null;
            username: string;
            isOnline: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        initiatorId: string;
        receiverId: string;
    }>;
    create(body: {
        receiverId: string;
    }, req: AuthenticatedRequest): Promise<{
        initiator: {
            id: string;
            avatar: string | null;
            username: string;
            isOnline: boolean;
        };
        receiver: {
            id: string;
            avatar: string | null;
            username: string;
            isOnline: boolean;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        initiatorId: string;
        receiverId: string;
    }>;
}
export {};
