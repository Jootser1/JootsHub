import { IcebreakerService } from './icebreaker.service';
import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { QuestionService } from 'src/questions/question.service';
import { postedResponse } from '@shared/icebreaker.types';

@Controller('icebreakers')
export class IcebreakerController {
  constructor(
    private readonly icebreakerService: IcebreakerService,
    private readonly questionService: QuestionService
  ) {}

  @Post('response')
  @UseGuards(JwtAuthGuard)
  async postResponseToQuestion(
    @Body() postedResponse: postedResponse
  ) {
    const { userId, pollId, optionId, conversationId, locale } = postedResponse;

    // Vérification des paramètres requis
    if (!userId || !pollId || !optionId || !conversationId || !locale) {
      throw new Error(
        'Les paramètres userId, pollId, optionId et conversationId sont requis'
      );
    }

    // 1. Sauvegarder la réponse à la question dans la BDD
    const savedResponse = await this.questionService.saveUserAnswerInDB(postedResponse);

    // 2. Mettre à jour le statut de l'icebreaker si dans le contexte d'une conversation
    if (conversationId) {
      await this.icebreakerService.processIcebreakersPostResponses(postedResponse);
    }

    return savedResponse;
  }
}
