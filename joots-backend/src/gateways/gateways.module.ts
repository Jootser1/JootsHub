import { Module } from '@nestjs/common';
import { UserGateway } from './user.gateway';
import { ChatGateway } from './chat.gateway';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisModule } from '../redis/redis.module';
import { RedisService } from '../redis/redis.service';
import { HeartbeatService } from './services/heartbeat.service';

@Module({
  imports: [RedisModule],
  providers: [
    UserGateway, 
    ChatGateway, 
    PrismaService, 
    RedisService,
    HeartbeatService
  ],
  exports: [UserGateway, ChatGateway],
})
export class GatewaysModule {}