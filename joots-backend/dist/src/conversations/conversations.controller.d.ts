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
            isRead: boolean;
            content: string;
            editedAt: Date | null;
            isDeleted: boolean;
            messageType: import("@prisma/client").$Enums.MessageType;
            userAId: string | null;
            userAAnswer: string | null;
            userBId: string | null;
            userBAnswer: string | null;
            senderId: string | null;
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
        locale: import("@prisma/client").$Enums.LocaleCode;
        level: number;
        ProgressPoint: number;
    })[]>;
    findMessages(id: string, req: AuthenticatedRequest): Promise<({
        sender: {
            id: string;
            avatar: string | null;
            username: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        conversationId: string;
        isRead: boolean;
        content: string;
        editedAt: Date | null;
        isDeleted: boolean;
        messageType: import("@prisma/client").$Enums.MessageType;
        userAId: string | null;
        userAAnswer: string | null;
        userBId: string | null;
        userBAnswer: string | null;
        senderId: string | null;
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
        locale: import("@prisma/client").$Enums.LocaleCode;
        level: number;
        ProgressPoint: number;
    }>;
    findOne(id: string, req: AuthenticatedRequest): Promise<{
        messages: {
            id: string;
            createdAt: Date;
            conversationId: string;
            isRead: boolean;
            content: string;
            editedAt: Date | null;
            isDeleted: boolean;
            messageType: import("@prisma/client").$Enums.MessageType;
            userAId: string | null;
            userAAnswer: string | null;
            userBId: string | null;
            userBAnswer: string | null;
            senderId: string | null;
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
        locale: import("@prisma/client").$Enums.LocaleCode;
        level: number;
        ProgressPoint: number;
    }>;
}
export {};
