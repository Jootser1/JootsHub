import { LoggerService } from '@nestjs/common';
import 'winston-daily-rotate-file';
export declare class AppLogger implements LoggerService {
    private logger;
    constructor();
    log(message: string): void;
    error(message: string, trace?: string): void;
    warn(message: string): void;
}
