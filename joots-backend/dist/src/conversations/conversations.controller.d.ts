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
            editedAt: Date | null;
            isRead: boolean;
            isDeleted: boolean;
            conversationId: string;
        }[];
        participants: ({
            user: {
                id: string;
                avatar: string | null;
                username: string;
                isOnline: boolean;
            };
        } & {
            userId: string;
            conversationId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string, req: AuthenticatedRequest): Promise<{
        messages: {
            id: string;
            createdAt: Date;
            senderId: string;
            content: string;
            editedAt: Date | null;
            isRead: boolean;
            isDeleted: boolean;
            conversationId: string;
        }[];
        participants: ({
            user: {
                id: string;
                avatar: string | null;
                username: string;
                isOnline: boolean;
            };
        } & {
            userId: string;
            conversationId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(body: {
        receiverId: string;
    }, req: AuthenticatedRequest): Promise<{
        participants: ({
            user: {
                id: string;
                avatar: string | null;
                username: string;
                isOnline: boolean;
            };
        } & {
            userId: string;
            conversationId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
