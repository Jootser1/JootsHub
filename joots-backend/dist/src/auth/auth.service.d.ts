import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(email: string, password: string): Promise<any>;
    login(email: string, password: string): Promise<{
        user: any;
        access_token: string;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
}
