import { Controller, Get, Param, Query, UseGuards, Post, Body } from '@nestjs/common';
import { QuestionService } from './question.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
  
  @Get('by-id/:id')
  async getQuestionGroup(@Param('id') id: string) {
    return this.questionService.getQuestionGroup(id);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('random')
  async getNextRandomQuestionGroup(@Query('userId1') userId1: string, @Query('userId2') userId2: string) {
    return this.questionService.getNextRandomQuestionGroup(userId1, userId2);
  }
  
  @Post('response')
  @UseGuards(JwtAuthGuard)
  async postResponseToQuestion(
    @Body() body: {
      userId: string;
      questionGroupId: string;
      optionId: string;
      conversationId: string;
    }
  ) {
    const { userId, questionGroupId, optionId, conversationId } = body;

    // Vérification des paramètres requis
    if (!userId || !questionGroupId || !optionId || !conversationId) {
      throw new Error('Les paramètres userId, questionGroupId, optionId et conversationId sont requis');
    }
    return this.questionService.saveResponse(userId, questionGroupId, optionId, conversationId);
  }
}