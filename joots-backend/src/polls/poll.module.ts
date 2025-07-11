import { Module, forwardRef } from '@nestjs/common';
import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import { PrismaModule } from '../prisma/prisma.module';
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
  controllers: [PollController],
  providers: [
    PollService,
    RedisService,
    IcebreakerService,
    MessagesService,
    ConversationsService,
    UserContactsService,
    Logger,
  ],
  exports: [PollService],
})
export class PollModule {}
