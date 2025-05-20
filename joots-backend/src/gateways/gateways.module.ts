import { Logger, Module } from '@nestjs/common';
import { UserGateway } from './user.gateway';
import { ChatGateway } from './chat.gateway';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisModule } from '../redis/redis.module';
import { RedisService } from '../redis/redis.service';
import { HeartbeatService } from './services/heartbeat.service';
import { UserContactsService } from '../users/contacts/contacts.service';
import { QuestionService } from '../questions/question.service';
import { IcebreakerService } from '../icebreakers/icebreaker.service';
import { MessagesService } from '../messages/messages.service';
import { UsersService } from '../users/users.service';
@Module({
  imports: [RedisModule],
  providers: [
    UserGateway, 
    ChatGateway,  
    Logger, 
    PrismaService, 
    RedisService,
    HeartbeatService, 
    UserContactsService,
    UsersService,
    QuestionService,
    IcebreakerService,
    MessagesService
  ],
  exports: [UserGateway, ChatGateway],
})
export class GatewaysModule {}