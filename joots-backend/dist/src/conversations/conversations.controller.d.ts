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
            messageType: import("@prisma/client").$Enums.MessageType;
            userAId: string | null;
            userAAnswer: string | null;
            userBId: string | null;
            userBAnswer: string | null;
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
        level: number;
        ProgressPoint: number;
        locale: import("@prisma/client").$Enums.LocaleCode;
    })[]>;
    findMessages(id: string, req: AuthenticatedRequest): Promise<({
        sender: {
            id: string;
            avatar: string | null;
            username: string;
        };
    } & {
        id: string;
        createdAt: Date;
        senderId: string;
        content: string;
        editedAt: Date | null;
        isRead: boolean;
        isDeleted: boolean;
        conversationId: string;
        messageType: import("@prisma/client").$Enums.MessageType;
        userAId: string | null;
        userAAnswer: string | null;
        userBId: string | null;
        userBAnswer: string | null;
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
        level: number;
        ProgressPoint: number;
        locale: import("@prisma/client").$Enums.LocaleCode;
    }>;
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
            messageType: import("@prisma/client").$Enums.MessageType;
            userAId: string | null;
            userAAnswer: string | null;
            userBId: string | null;
            userBAnswer: string | null;
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
        level: number;
        ProgressPoint: number;
        locale: import("@prisma/client").$Enums.LocaleCode;
    }>;
}
export {};
