import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<{
        id: string;
        userNumber: number;
        email: string;
        password: string;
        username: string;
        isOnline: boolean;
        avatar: string | null;
        createdAt: Date;
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
    }>;
}
