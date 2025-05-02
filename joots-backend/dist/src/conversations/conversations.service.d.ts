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
    findOne(id: string, userId: string): Promise<{
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
    findConversation(userId: string, receiverId: string): Promise<{
        messages: ({
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
    }>;
    findMessages(conversationId: string, userId: string): Promise<({
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
}
