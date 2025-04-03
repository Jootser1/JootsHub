import { PrismaService } from '../../prisma/prisma.service';
import { UserGateway } from '../gateways/user.gateway';
export declare class ConversationsService {
    private readonly prisma;
    private readonly userGateway;
    constructor(prisma: PrismaService, userGateway: UserGateway);
    private readonly userSelect;
    findAll(userId: string): Promise<({
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
    findOne(id: string, userId: string): Promise<{
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
            senderId: string;
            content: string;
            editedAt: Date | null;
            isRead: boolean;
            isDeleted: boolean;
            conversationId: string;
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
            conversationId: string;
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
            userId: string;
            conversationId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
