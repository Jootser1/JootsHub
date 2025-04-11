import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<{
        id: string;
        avatar: string | null;
        bio: string | null;
        createdAt: Date;
        updatedAt: Date;
        userNumber: number;
        username: string;
        isOnline: boolean;
        isAvailableForChat: boolean;
    }[]>;
    getUsersCount(): Promise<{
        totalUsers: number;
    }>;
    getOnlineUsers(): Promise<{
        id: string;
        username: string;
    }[]>;
    getUser(id: string): Promise<{
        id: string;
        email: string;
        username: string;
        avatar: string | null;
        isAvailableForChat: boolean;
        isOnline: boolean;
    }>;
    updateChatPreference(id: string, isAvailableForChat: boolean): Promise<{
        id: string;
        avatar: string | null;
        bio: string | null;
        createdAt: Date;
        updatedAt: Date;
        userNumber: number;
        username: string;
        isOnline: boolean;
        isAvailableForChat: boolean;
    }>;
    getRandomAvailableUser(user: any): Promise<{
        id: string;
        avatar: string | null;
        username: string;
    }>;
    updateUserStatus(id: string, isOnline: boolean): Promise<{
        id: string;
        isOnline: boolean;
    }>;
}
