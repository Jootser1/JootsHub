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
    findOne(id: string, userId: string): Promise<{
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
    findConversation(userId: string, receiverId: string): Promise<{
        messages: ({
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
        })[];
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
    create(userId: string, receiverId: string): Promise<{
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
    findMessages(conversationId: string, userId: string): Promise<({
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
}
