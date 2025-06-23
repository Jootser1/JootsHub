import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GatewaysModule } from '../gateways/gateways.module';
import { UserContactsService } from '../users/contacts/contacts.service';
import { RedisModule } from '../redis/redis.module';
import { LoggerModule } from '../logger/logger.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [PrismaModule, GatewaysModule, RedisModule, LoggerModule],
  controllers: [ConversationsController],
  providers: [ConversationsService, UserContactsService, UsersService],
  exports: [ConversationsService],
})
export class ConversationsModule {}
