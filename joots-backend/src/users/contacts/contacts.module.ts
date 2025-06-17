import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserContactsController } from './contacts.controller';
import { UserContactsService } from './contacts.service';
import { RedisModule } from '../../redis/redis.module';
import { LoggerModule } from '../../logger/logger.module';

@Module({
  imports: [PrismaModule, RedisModule, LoggerModule],
  controllers: [UserContactsController],
  providers: [UserContactsService],
  exports: [UserContactsService],
})
export class ContactsModule {}
