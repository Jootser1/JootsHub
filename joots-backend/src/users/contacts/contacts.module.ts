import { Logger, Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserContactsController } from './contacts.controller';
import { UserContactsService } from './contacts.service';
import { RedisModule } from '../../redis/redis.module';
@Module({
  imports: [PrismaModule, RedisModule],
  controllers: [UserContactsController],
  providers: [UserContactsService, Logger],
  exports: [UserContactsService],
})
export class ContactsModule {}
