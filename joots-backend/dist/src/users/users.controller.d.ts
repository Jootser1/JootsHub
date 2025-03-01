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
        createdAt: Date;
    }[]>;
    getUsersCount(): Promise<{
        totalUsers: number;
    }>;
    getOnlineUsers(): Promise<{
        id: string;
        username: string;
    }[]>;
}
