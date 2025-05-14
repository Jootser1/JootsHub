import { Module, forwardRef } from '@nestjs/common';
import { IcebreakerService } from './icebreaker.service';
import { IcebreakerController } from './icebreaker.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { RedisModule } from '../redis/redis.module';  
import { RedisService } from '../redis/redis.service';
import { QuestionService } from '../questions/question.service';
import { GatewaysModule } from '../gateways/gateways.module';
import { MessagesService } from '../messages/messages.service';
@Module({
  imports: [
    PrismaModule, 
    RedisModule,
    forwardRef(() => GatewaysModule),
  ],
  controllers: [IcebreakerController],
  providers: [IcebreakerService, RedisService, QuestionService, MessagesService],
  exports: [IcebreakerService],
})
export class IcebreakerModule {} 