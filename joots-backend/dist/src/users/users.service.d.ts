import { PrismaService } from '../../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllUsers(): Promise<{
        id: string;
        userNumber: number;
        email: string;
        password: string;
        username: string;
        isOnline: boolean;
        createdAt: Date;
    }[]>;
    getUsersCount(): Promise<number>;
    getOnlineUsers(): Promise<{
        id: string;
        username: string;
    }[]>;
}
