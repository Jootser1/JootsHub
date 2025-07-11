import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<{
        created_at: Date;
        updated_at: Date;
        user_id: string;
        username: string;
        user_number: number;
        avatar: string | null;
        last_seen: Date;
        role: import(".prisma/client").$Enums.UserRole;
    }[]>;
    getUsersCount(): Promise<{
        totalUsers: number;
    }>;
    getUserProfileForConversation(userId: string, conversationId: string, currentUser: any): Promise<any>;
    updateChatPreference(id: string, isAvailableForChat: boolean): Promise<{
        created_at: Date;
        updated_at: Date;
        user_id: string;
        username: string;
        user_number: number;
        avatar: string | null;
        last_seen: Date;
        role: import(".prisma/client").$Enums.UserRole;
    }>;
    getRandomAvailableUser(user: any): Promise<{
        created_at: Date;
        updated_at: Date;
        user_id: string;
        username: string;
        user_number: number;
        avatar: string | null;
        last_seen: Date;
        role: import(".prisma/client").$Enums.UserRole;
    }>;
    getUser(id: string): Promise<{
        id: string;
        email: string;
        username: string;
        avatar: string | null;
        last_seen: Date;
    }>;
}
