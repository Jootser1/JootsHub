import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IcebreakerService } from '../icebreakers/icebreaker.service';

@Controller('questions')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly icebreakerService: IcebreakerService
  ) {}

  @Get('by-id/:id')
  async getPoll(@Param('id') id: string) {
    return this.questionService.getPoll(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('random')
  async getNextRandomPoll(
    @Query('conversationId') conversationId: string,
    @Query('userId1') userId1: string,
    @Query('userId2') userId2: string
  ) {
    return this.questionService.getNextRandomPoll(conversationId, userId1, userId2);
  }
}
