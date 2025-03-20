import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    private generateTokens;
    register(email: string, password: string): Promise<{
        id: string;
        userNumber: number;
        email: string;
        password: string;
        username: string;
        isOnline: boolean;
        avatar: string | null;
        createdAt: Date;
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            id: string;
            userNumber: number;
            email: string;
            password: string;
            username: string;
            isOnline: boolean;
            avatar: string | null;
            createdAt: Date;
        };
    }>;
    refreshToken(refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
}
