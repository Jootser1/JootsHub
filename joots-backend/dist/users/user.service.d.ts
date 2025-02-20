import { AppLogger } from '../logger/logger.service';
export declare class UserService {
    private readonly logger;
    constructor(logger: AppLogger);
    getUser(id: number): {
        id: number;
        name: string;
    };
}
