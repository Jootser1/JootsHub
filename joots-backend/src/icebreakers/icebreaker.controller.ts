import { IcebreakerService } from './icebreaker.service';
import { Controller, Get, Param, Query, UseGuards, Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { QuestionService } from 'src/questions/question.service';

@Controller('icebreakers')
export class IcebreakerController {
  constructor(
    private readonly icebreakerService: IcebreakerService,
    private readonly questionService: QuestionService
  ) {}

  @Post('response')
  @UseGuards(JwtAuthGuard)
  async postResponseToQuestion(
    @Body() body: {
      userId: string;
      questionGroupId: string;
      optionId: string;
      conversationId?: string;
    }
  ) {
    const { userId, questionGroupId, optionId, conversationId } = body;
    
    // Vérification des paramètres requis
    if (!userId || !questionGroupId || !optionId || !conversationId) {
      throw new Error('Les paramètres userId, questionGroupId, optionId et conversationId sont requis');
    }
    
    // 1. Sauvegarder la réponse à la question dans la BDD
    const savedResponse = await this.questionService.saveUserAnswerInDB(userId, questionGroupId, optionId, conversationId);
    
    // 2. Mettre à jour le statut de l'icebreaker si dans le contexte d'une conversation
    if (conversationId) {
      await this.icebreakerService.processIcebreakersPostResponses(userId, questionGroupId, optionId, conversationId);
    }
    
    return savedResponse;
  }
} 