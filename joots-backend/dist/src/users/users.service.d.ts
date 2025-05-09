import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
type UserWithAuth = Prisma.UserGetPayload<{
    include: {
        auth: true;
    };
}>;
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllUsers(): Promise<{
        id: string;
        createdAt: Date;
        avatar: string | null;
        bio: string | null;
        updatedAt: Date;
        userNumber: number;
        username: string;
        isOnline: boolean;
        isAvailableForChat: boolean;
    }[]>;
    findById(id: string): Promise<UserWithAuth>;
    getUsersCount(): Promise<number>;
    getOnlineUsers(): Promise<{
        id: string;
        username: string;
    }[]>;
    updateChatPreference(userId: string, isAvailableForChat: boolean): Promise<{
        id: string;
        createdAt: Date;
        avatar: string | null;
        bio: string | null;
        updatedAt: Date;
        userNumber: number;
        username: string;
        isOnline: boolean;
        isAvailableForChat: boolean;
    }>;
    getRandomAvailableUser(currentUserId: string): Promise<{
        id: string;
        avatar: string | null;
        username: string;
    }>;
    updateUserStatus(userId: string, isOnline: boolean): Promise<{
        id: string;
        isOnline: boolean;
    }>;
}
export {};
