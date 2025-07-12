import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PollAnswerService } from './pollAnswer.service';
import { PollAnswerController } from './pollAnswer.controller';

@Module({
  imports: [PrismaModule],
  providers: [PollAnswerService],
  controllers: [PollAnswerController],
  exports: [PollAnswerService],
})
export class PollAnswerModule {} 