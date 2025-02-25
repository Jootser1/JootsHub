import { PrismaService } from '../../prisma/prisma.service';
export declare class AuthService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    register(email: string, password: string, username: string): Promise<{
        id: string;
        email: string;
        password: string;
        username: string;
        createdAt: Date;
    }>;
}
