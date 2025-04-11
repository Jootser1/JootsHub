import { Module } from '@nestjs/common';
import { ConversationsController } from './conversations.controller';
import { ConversationsService } from './conversations.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { GatewaysModule } from '../gateways/gateways.module';
import { UserContactsService } from '../users/contacts/contacts.service';

@Module({
  imports: [
    PrismaModule,
    GatewaysModule
  ],
  controllers: [ConversationsController],
  providers: [ConversationsService, UserContactsService],
  exports: [ConversationsService],
})
export class ConversationsModule {}