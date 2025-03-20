import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    login(loginDto: LoginDto): Promise<{
        success: boolean;
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
        access_token: string;
    }>;
    refreshToken(body: {
        refresh_token: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(body: {
        userId: string;
    }): Promise<{
        message: string;
    }>;
}
