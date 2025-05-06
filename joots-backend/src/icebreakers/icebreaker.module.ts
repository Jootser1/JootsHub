import { Module } from '@nestjs/common';
import { IcebreakerService } from './icebreaker.service';
import { IcebreakerController } from './icebreaker.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { RedisModule } from '../redis/redis.module';  
import { RedisService } from '../redis/redis.service';
import { QuestionService } from '../questions/question.service';
@Module({
  imports: [PrismaModule, RedisModule],
  controllers: [IcebreakerController],
  providers: [IcebreakerService, RedisService, QuestionService],
})
export class IcebreakerModule {} 