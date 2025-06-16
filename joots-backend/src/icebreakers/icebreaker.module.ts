import { Logger, Module, forwardRef } from '@nestjs/common';
import { IcebreakerService } from './icebreaker.service';
import { IcebreakerController } from './icebreaker.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RedisModule } from '../redis/redis.module';
import { RedisService } from '../redis/redis.service';
import { QuestionService } from '../questions/question.service';
import { GatewaysModule } from '../gateways/gateways.module';
import { MessagesService } from '../messages/messages.service';
import { ConversationsService } from 'src/conversations/conversations.service';
import { ContactsModule } from '../users/contacts/contacts.module';

@Module({
  imports: [
    PrismaModule,
    RedisModule,
    forwardRef(() => GatewaysModule),
    ContactsModule,
  ],
  controllers: [IcebreakerController],
  providers: [
    IcebreakerService,
    RedisService,
    QuestionService,
    MessagesService,
    ConversationsService, 
    Logger,
  ],
  exports: [IcebreakerService],
})
export class IcebreakerModule {}
