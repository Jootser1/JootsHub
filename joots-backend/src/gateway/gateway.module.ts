import { Module } from '@nestjs/common';
import { UserGateway } from './user.gateway';
import { PrismaService } from '../../prisma/prisma.service';
import { IcebreakerGateway } from './icebreaker.gateway';


@Module({
  providers: [UserGateway, IcebreakerGateway, PrismaService],
  exports: [UserGateway],
})
export class GatewayModule {}
