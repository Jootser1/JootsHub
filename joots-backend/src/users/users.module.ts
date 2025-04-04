import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserContactsService } from './contacts/contacts.service';
import { UserContactsController } from './contacts/contacts.controller';


@Module({
  imports: [PrismaModule],
  controllers: [UsersController, UserContactsController],
  providers: [UsersService, UserContactsService],
})
export class UsersModule {}

