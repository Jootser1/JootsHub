import { Module, forwardRef } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { RedisModule } from '../redis/redis.module';
import { RedisService } from '../redis/redis.service';
import { IcebreakerService } from '../icebreakers/icebreaker.service';
import { GatewaysModule } from '../gateways/gateways.module';


@Module({
  imports: [PrismaModule, RedisModule, forwardRef(() => GatewaysModule)],
  controllers: [QuestionController],
  providers: [QuestionService, RedisService, IcebreakerService],
})
export class QuestionModule {} 