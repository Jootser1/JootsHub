import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { RedisModule } from '../redis/redis.module';
import { RedisService } from '../redis/redis.service';
@Module({
  imports: [PrismaModule, RedisModule],
  controllers: [QuestionController],
  providers: [QuestionService, RedisService],
})
export class QuestionModule {} 