import { Module } from '@nestjs/common';
import { PrismaModule } from '../../../prisma/prisma.module';
import { UserContactsController } from './contacts.controller';
import { UserContactsService } from './contacts.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserContactsController],
  providers: [UserContactsService],
  exports: [UserContactsService]
})
export class ContactsModule {} 