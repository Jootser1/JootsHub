import { Module, forwardRef } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RedisModule } from '../redis/redis.module';
import { RedisService } from '../redis/redis.service';
import { IcebreakerService } from '../icebreakers/icebreaker.service';
import { GatewaysModule } from '../gateways/gateways.module';
import { MessagesService } from '../messages/messages.service';
import { ConversationsService } from '../conversations/conversations.service';
import { UserContactsService } from '../users/contacts/contacts.service';
import { Logger } from '@nestjs/common';

@Module({
  imports: [PrismaModule, RedisModule, forwardRef(() => GatewaysModule)],
  controllers: [QuestionController],
  providers: [
    QuestionService,
    RedisService,
    IcebreakerService,
    MessagesService,
    ConversationsService,
    UserContactsService,
    Logger,
  ],
  exports: [QuestionService],
})
export class QuestionModule {}
