import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(email: string, password: string, username: string): Promise<{
        id: string;
        email: string;
        password: string;
        username: string;
        createdAt: Date;
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            password: string;
            username: string;
            createdAt: Date;
        };
    }>;
}
