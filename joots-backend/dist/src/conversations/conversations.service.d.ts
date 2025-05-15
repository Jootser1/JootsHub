import { PrismaService } from '../../prisma/prisma.service';
import { UserGateway } from '../gateways/user.gateway';
import { UserContactsService } from '../users/contacts/contacts.service';
export declare class ConversationsService {
    private readonly prisma;
    private readonly userGateway;
    private readonly userContactsService;
    constructor(prisma: PrismaService, userGateway: UserGateway, userContactsService: UserContactsService);
    private readonly userSelect;
    findAll(userId: string): Promise<({
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
    findOne(id: string, userId: string): Promise<{
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
    findConversation(userId: string, receiverId: string): Promise<{
        messages: ({
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
        })[];
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
    create(userId: string, receiverId: string): Promise<{
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
    findMessages(conversationId: string, userId: string): Promise<({
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
}
