import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../../prisma/prisma.module'; // 👈 Ajoute ça !
import { JwtModule } from '@nestjs/jwt';



@Module({
  imports: [PrismaModule, JwtModule.register({})],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

