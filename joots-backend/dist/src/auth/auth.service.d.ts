import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(email: string, password: string): Promise<{
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
    login(email: string, password: string): Promise<{
        user: {
            email: string;
            id: string;
            createdAt: Date;
            avatar: string | null;
            bio: string | null;
            updatedAt: Date;
            userNumber: number;
            username: string;
            isOnline: boolean;
            isAvailableForChat: boolean;
        };
        access_token: string;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
}
