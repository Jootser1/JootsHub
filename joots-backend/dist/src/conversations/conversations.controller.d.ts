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
            createdAt: Date;
            id: string;
            conversationId: string;
            senderId: string;
            content: string;
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
            userId: string;
            createdAt: Date;
            updatedAt: Date;
            isIcebreakerReady: boolean;
            hasGivenAnswer: boolean;
            conversationId: string;
        })[];
    } & {
        createdAt: Date;
        id: string;
        updatedAt: Date;
    })[]>;
    findOne(id: string, req: AuthenticatedRequest): Promise<{
        messages: {
            createdAt: Date;
            id: string;
            conversationId: string;
            senderId: string;
            content: string;
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
            userId: string;
            createdAt: Date;
            updatedAt: Date;
            isIcebreakerReady: boolean;
            hasGivenAnswer: boolean;
            conversationId: string;
        })[];
    } & {
        createdAt: Date;
        id: string;
        updatedAt: Date;
    }>;
    findMessages(id: string, req: AuthenticatedRequest): Promise<({
        sender: {
            id: string;
            avatar: string | null;
            username: string;
        };
    } & {
        createdAt: Date;
        id: string;
        conversationId: string;
        senderId: string;
        content: string;
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
            userId: string;
            createdAt: Date;
            updatedAt: Date;
            isIcebreakerReady: boolean;
            hasGivenAnswer: boolean;
            conversationId: string;
        })[];
    } & {
        createdAt: Date;
        id: string;
        updatedAt: Date;
    }>;
}
export {};
