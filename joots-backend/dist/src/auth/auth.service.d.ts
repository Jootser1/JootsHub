import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(email: string, password: string): Promise<{
        id: string;
        userNumber: number;
        email: string;
        password: string;
        username: string;
        createdAt: Date;
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
        user: {
            id: string;
            userNumber: number;
            email: string;
            password: string;
            username: string;
            createdAt: Date;
        };
    }>;
}
