import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GatewaysModule } from '../gateways/gateways.module';
import { UserContactsService } from '../users/contacts/contacts.service';
import { Logger } from '@nestjs/common';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [PrismaModule, GatewaysModule, RedisModule],
  controllers: [ConversationsController],
  providers: [ConversationsService, UserContactsService, Logger],
  exports: [ConversationsService],
})
export class ConversationsModule {}
