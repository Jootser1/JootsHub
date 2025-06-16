import { Module } from '@nestjs/common';
import { MyProfileService } from './profile.service';
import { MyProfileController } from './profile.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MyProfileService],
  controllers: [MyProfileController]
})
export class MyProfileModule {}
