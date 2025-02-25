import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<{
        id: string;
        email: string;
        password: string;
        username: string;
        createdAt: Date;
    }[]>;
    getUsersCount(): Promise<{
        totalUsers: number;
    }>;
}
