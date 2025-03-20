import { Module } from '@nestjs/common';
import { UserGateway } from './user.gateway';
import { PrismaService } from '../../prisma/prisma.service';


@Module({
  providers: [UserGateway, PrismaService],
  exports: [UserGateway],
})
export class GatewayModule {}
