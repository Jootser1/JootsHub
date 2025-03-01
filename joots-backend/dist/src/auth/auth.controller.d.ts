import { AuthService } from './auth.service';
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
            isOnline: boolean;
            createdAt: Date;
        };
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
}
