import { Controller, Get, Param, Query, UseGuards, Post, Body } from '@nestjs/common';
import { QuestionService } from './question.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IcebreakerService } from '../icebreakers/icebreaker.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService, private readonly icebreakerService: IcebreakerService) {}
  
  @Get('by-id/:id')
  async getQuestionGroup(@Param('id') id: string) {
    return this.questionService.getQuestionGroup(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('random')
  async getNextRandomQuestionGroup(@Query('userId1') userId1: string, @Query('userId2') userId2: string) {
    return this.questionService.getNextRandomQuestionGroup(userId1, userId2);
  }
  
  
}