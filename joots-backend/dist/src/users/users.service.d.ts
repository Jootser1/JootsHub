import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client';
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
    findById(id: string): Promise<User>;
    getUsersCount(): Promise<number>;
    getOnlineUsers(): Promise<{
        id: string;
        username: string;
    }[]>;
}
