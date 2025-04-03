import { AppService } from './app.service';
import { AppLogger } from './logger/logger.service';
export declare class AppController {
    private readonly appService;
    private readonly logger;
    constructor(appService: AppService, logger: AppLogger);
    getHello(): string;
}
