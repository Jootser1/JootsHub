import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(email: string, password: string): Promise<{
        id: string;
        avatar: string | null;
        bio: string | null;
        createdAt: Date;
        updatedAt: Date;
        userNumber: number;
        username: string;
        isOnline: boolean;
        isAvailableForChat: boolean;
    }>;
    login(loginDto: LoginDto): Promise<{
        success: boolean;
        user: {
            email: string;
            id: string;
            avatar: string | null;
            bio: string | null;
            createdAt: Date;
            updatedAt: Date;
            userNumber: number;
            username: string;
            isOnline: boolean;
            isAvailableForChat: boolean;
        };
        access_token: string;
    }>;
    logout(body: {
        userId: string;
    }): Promise<{
        message: string;
    }>;
}
