import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PollWithRelations } from '../types/question';
import { IcebreakerService } from '../icebreakers/icebreaker.service';
import { postedResponse } from '@shared/icebreaker.types';
import { ConversationsService } from 'src/conversations/conversations.service';
import { LocaleCode } from '@shared/locale.types';

@Injectable()
export class QuestionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly icebreakerService: IcebreakerService,
    private readonly conversationsService: ConversationsService
  ) {}

  async getUserLastResponseToQuestion(
    currentUserId: string,
    pollId: string
  ) {
    return this.prisma.pollAnswer.findFirst({
      where: {
        user_id: currentUserId,
        poll_id: pollId,
      },
      orderBy: {
        answered_at: 'desc',
      },
      include: {
        option: true,
      },
    });
  }

  async getPoll(pollId: string) {
    return this.prisma.poll.findUnique({
      where: { poll_id: pollId },
    });
  }

  // To improve later by adding
  // the selection to trendy questions first,
  // Respect to preferences defined by the users
  // Selecting questions unanswered by both users
  // if no question, favor the one answered by only one,
  // if none, the oldest one
  async getNextRandomPoll(
    conversationId: string,
    userId1: string,
    userId2: string
  ): Promise<PollWithRelations | null> {
    const answeredQuestionsUser1 = await this.prisma.pollAnswer.findMany({
      where: { user_id: userId1 },
      select: { poll_id: true },
    });

    const answeredQuestionsUser2 = await this.prisma.pollAnswer.findMany({
      where: { user_id: userId2 },
      select: { poll_id: true },
    });

    const answeredPollIdsUser1 = answeredQuestionsUser1.map(
      (answer) => answer.poll_id
    );
    const answeredPollIdsUser2 = answeredQuestionsUser2.map(
      (answer) => answer.poll_id
    );

    const locale = await this.conversationsService.getConversationLocale(conversationId);

    const unansweredPolls = await this.prisma.poll.findMany({
      where: {
        poll_id: {
          notIn: [
            ...answeredPollIdsUser1,
            ...answeredPollIdsUser2,
          ],
        },
        is_enabled: true,
      },
      orderBy: {
        created_at: 'asc',
      },
      include: {
        poll_translations: {
          where: {
            locale: locale,
          },
        },
        options: {
          include: {
            translations: {
              where: {
                locale: locale,
              },
            },
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    // Vérifiez s'il y a des questions non répondues
    if (unansweredPolls.length === 0) {
      return null; // ou gérez le cas où il n'y a pas de questions disponibles
    }

    // Sélectionner un élément aléatoire
    const randomIndex = Math.floor(
      Math.random() * unansweredPolls.length
    );
    const randomUnansweredPoll = unansweredPolls[randomIndex];
    return randomUnansweredPoll;
  }


  // Méthode spécifique pour enregistrer la réponse en BDD
  async saveUserAnswerInDB(response: postedResponse) {
    return this.prisma.$transaction(async (prisma) => {
      // Créer la réponse dans PollAnswer
      const pollAnswer = await prisma.pollAnswer.create({
        data: {
          user_id: response.userId,
          poll_id: response.pollId,
          poll_option_id: response.optionId,
          answered_at: new Date(),
          ...(response.conversationId ? { conversation_id: response.conversationId } : {}),
        },
      });

      // Créer l'entrée dans PollAnswerSource
      await prisma.pollAnswerSource.create({
        data: {
          source_type: 'CONVERSATION',
          locale: response.locale as LocaleCode,
          conversation_id: response.conversationId,
          answer: { connect: { poll_answer_id: pollAnswer.poll_answer_id } },
        },
      });

      return pollAnswer;
    });
  }
}
