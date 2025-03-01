"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLogger = void 0;
const common_1 = require("@nestjs/common");
const winston = require("winston");
require("winston-daily-rotate-file");
console.log('Current working directory:', process.cwd());
let AppLogger = class AppLogger {
    logger;
    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(winston.format.timestamp(), winston.format.printf(({ level, message, timestamp, }) => {
                return `${timestamp} [${level.toUpperCase()}] ${message}`;
            })),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: 'logs/error.log',
                    level: 'error',
                }),
                new winston.transports.File({ filename: 'logs/combined.log' }),
                new winston.transports.DailyRotateFile({
                    filename: 'logs/%DATE%.log',
                    datePattern: 'YYYY-MM-DD',
                    maxFiles: '14d',
                }),
            ],
        });
    }
    log(message) {
        this.logger.info(message);
    }
    error(message, trace) {
        this.logger.error(`${message} \nTrace: ${trace}`);
    }
    warn(message) {
        this.logger.warn(message);
    }
};
exports.AppLogger = AppLogger;
exports.AppLogger = AppLogger = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppLogger);
//# sourceMappingURL=logger.service.js.map