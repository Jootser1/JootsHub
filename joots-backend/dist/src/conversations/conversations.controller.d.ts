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
            conversationId: string;
            content: string;
            senderId: string;
            editedAt: Date | null;
            isRead: boolean;
            isDeleted: boolean;
        }[];
        participants: ({
            user: {
                id: string;
                avatar: string | null;
                username: string;
                isOnline: boolean;
            };
        } & {
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            conversationId: string;
            isIcebreakerReady: boolean;
            hasGivenAnswer: boolean;
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
            conversationId: string;
            content: string;
            senderId: string;
            editedAt: Date | null;
            isRead: boolean;
            isDeleted: boolean;
        }[];
        participants: ({
            user: {
                id: string;
                avatar: string | null;
                username: string;
                isOnline: boolean;
            };
        } & {
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            conversationId: string;
            isIcebreakerReady: boolean;
            hasGivenAnswer: boolean;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findMessages(id: string, req: AuthenticatedRequest): Promise<({
        sender: {
            id: string;
            avatar: string | null;
            username: string;
        };
    } & {
        id: string;
        createdAt: Date;
        conversationId: string;
        content: string;
        senderId: string;
        editedAt: Date | null;
        isRead: boolean;
        isDeleted: boolean;
    })[]>;
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
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            conversationId: string;
            isIcebreakerReady: boolean;
            hasGivenAnswer: boolean;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
export {};
