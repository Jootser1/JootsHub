import { PrismaService } from '../../prisma/prisma.service';
import { UserGateway } from '../gateways/user.gateway';
export declare class ConversationsService {
    private readonly prisma;
    private readonly userGateway;
    constructor(prisma: PrismaService, userGateway: UserGateway);
    findAll(userId: string): Promise<({
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
    findOne(id: string, userId: string): Promise<{
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
    create(userId: string, receiverId: string): Promise<{
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
            isRead: boolean;
            conversationId: string;
        })[];
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
    createConversation(userId: string, receiverId: string): Promise<{
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
            isRead: boolean;
            conversationId: string;
        })[];
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
    getAllConversations(userId: string): Promise<({
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
            isRead: boolean;
            conversationId: string;
        })[];
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
}
