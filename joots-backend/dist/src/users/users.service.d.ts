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
        created_at: Date;
        updated_at: Date;
        user_id: string;
        username: string;
        user_number: number;
        avatar: string | null;
        last_seen: Date;
        role: import(".prisma/client").$Enums.UserRole;
    }[]>;
    findById(id: string): Promise<UserWithAuth>;
    getUsersCount(): Promise<number>;
    getOnlineUsers(): Promise<{
        created_at: Date;
        updated_at: Date;
        user_id: string;
        username: string;
        user_number: number;
        avatar: string | null;
        last_seen: Date;
        role: import(".prisma/client").$Enums.UserRole;
    }[]>;
    updateChatPreference(userId: string, isAvailableForChat: boolean): Promise<{
        created_at: Date;
        updated_at: Date;
        user_id: string;
        username: string;
        user_number: number;
        avatar: string | null;
        last_seen: Date;
        role: import(".prisma/client").$Enums.UserRole;
    }>;
    getRandomAvailableUser(currentUserId: string): Promise<{
        created_at: Date;
        updated_at: Date;
        user_id: string;
        username: string;
        user_number: number;
        avatar: string | null;
        last_seen: Date;
        role: import(".prisma/client").$Enums.UserRole;
    }>;
    updateUserStatus(userId: string, isOnline: boolean): Promise<{
        id: any;
        isOnline: any;
    }>;
}
export {};
