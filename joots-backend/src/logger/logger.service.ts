import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class AppLogger implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info', // Niveaux: error, warn, info, debug
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
          ({
            level,
            message,
            timestamp,
          }: {
            level: string;
            message: string;
            timestamp: string;
          }) => {
            return `${timestamp} [${level.toUpperCase()}] ${message}`;
          },
        ),
      ),
      transports: [
        new winston.transports.Console(), // Logs dans la console
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.DailyRotateFile({
          filename: 'logs/%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          maxFiles: '14d', // Garde les logs 14 jours
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace?: string) {
    this.logger.error(`${message} \nTrace: ${trace}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }
}
