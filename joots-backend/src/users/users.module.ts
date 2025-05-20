import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ContactsModule } from './contacts/contacts.module';
import { RedisModule } from '../redis/redis.module';
import { Logger } from '@nestjs/common';
@Module({
  imports: [PrismaModule, ContactsModule, RedisModule],
  controllers: [UsersController],
  providers: [UsersService, Logger],
  exports: [UsersService]
})
export class UsersModule {}

