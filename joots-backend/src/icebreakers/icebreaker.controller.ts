import { IcebreakerService } from './icebreaker.service';
import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { QuestionService } from 'src/questions/question.service';
import { postedResponse } from '@shared/icebreaker.types';
import { PollType } from '@shared/question.types';

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
    const { poll_type, user_id, poll_id, option_id, opentext, numeric, conversation_id, locale } = postedResponse;
    console.log('postedResponse', postedResponse);

    // Vérification des paramètres de base requis pour tous les types
    if (!user_id || !poll_id || !conversation_id || !locale) {
      throw new Error('Les paramètres user_id, poll_id, conversation_id et locale sont requis');
    }

    // Vérification des paramètres spécifiques selon le type de sondage
    if ([PollType.MULTIPLE_CHOICE, PollType.STEP_LABELED, PollType.YES_NO_IDK].includes(poll_type) && !option_id) {
      throw new Error('Le paramètre option_id est requis pour ce type de sondage');
    }

    if (poll_type === PollType.OPEN && !opentext) {
      throw new Error('Le paramètre opentext est requis pour un sondage de type OPEN');
    }

    if (poll_type === PollType.CONTINUOUS && !numeric) {
      throw new Error('Le paramètre numeric est requis pour un sondage de type CONTINUOUS');
    }

    
    // 1. Sauvegarder la réponse à la question dans la BDD
    const savedResponse = await this.questionService.saveUserAnswerInDB(postedResponse);

    // 2. Mettre à jour le statut de l'icebreaker si dans le contexte d'une conversation
    if (conversation_id) {
      await this.icebreakerService.processIcebreakersPostResponse(postedResponse);
    }

    return savedResponse;
  }
}
