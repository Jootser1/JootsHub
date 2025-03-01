import { Module } from '@nestjs/common';
import { AppLogger } from './logger.service';

@Module({
  providers: [AppLogger],
  exports: [AppLogger], // Permet de l'utiliser ailleurs
})
export class LoggerModule {}
