import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AppLogger } from './logger/logger.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: AppLogger,
  ) {
    // Test des différents niveaux de logs
    this.logger.log('Test de log INFO');
    this.logger.warn('Test de log WARN');
    this.logger.error('Test de log ERROR');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
