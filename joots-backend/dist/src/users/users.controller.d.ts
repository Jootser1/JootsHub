import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        avatar: string | null;
        bio: string | null;
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
        createdAt: Date;
        updatedAt: Date;
        avatar: string | null;
        bio: string | null;
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
}
