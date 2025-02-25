import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../../prisma/prisma.module'; // 👈 Ajoute ça !

@Module({
  imports: [PrismaModule], // 👈 Important pour injecter PrismaService
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

