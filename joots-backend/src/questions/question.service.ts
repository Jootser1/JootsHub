import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CurrentPollWithRelations } from '@shared/question.types';
import { IcebreakerService } from '../icebreakers/icebreaker.service';
import { postedResponse } from '@shared/icebreaker.types';
import { ConversationsService } from 'src/conversations/conversations.service';
import { LocaleCode } from '@shared/locale.types';
import { PollType } from '@shared/question.types';
import { PollAnswer } from '@prisma/client';

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
  ): Promise<CurrentPollWithRelations | null> {
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

    if (!conversationId) {
      throw new Error('conversationId est requis pour récupérer la locale');
    }

    const locale = await this.conversationsService.getConversationLocale(conversationId);

    const unansweredPolls = await this.prisma.poll.findMany({
      where: {
        poll_id: {
          notIn: [
            ...answeredPollIdsUser1,
            ...answeredPollIdsUser2,
          ],
        },
        type: {
          in: [PollType.OPEN, PollType.CONTINUOUS],
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
        scale_constraint: true,
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

    await this.prisma.conversation.update({
      where: { conversation_id: conversationId },
      data: { current_poll_id: randomUnansweredPoll.poll_id },
    });

    return {
      ...randomUnansweredPoll,
      categories: randomUnansweredPoll.categories.map(c => ({
        category_id: c.category.category_id,
        name: c.category.name,
      })),
      type: randomUnansweredPoll.type as PollType,
      poll_scale_constraints: randomUnansweredPoll.scale_constraint ? {
        constraint_id: randomUnansweredPoll.scale_constraint.poll_id,
        min_value: randomUnansweredPoll.scale_constraint.min_value,
        max_value: randomUnansweredPoll.scale_constraint.max_value,
        step: randomUnansweredPoll.scale_constraint.step_value ?? 1,
        min_label: randomUnansweredPoll.scale_constraint.min_label || undefined,
        max_label: randomUnansweredPoll.scale_constraint.max_label || undefined
      } : null
    };
  }


  // Méthode spécifique pour enregistrer la réponse en BDD
  async saveUserAnswerInDB(response: postedResponse) {

    return this.prisma.$transaction(async (prisma) => {
      let pollAnswer: PollAnswer;

      if (response.poll_type === PollType.OPEN) {
        pollAnswer = await prisma.pollAnswer.create({
          data: {
            user_id: response.user_id,
            poll_id: response.poll_id,
            opentext: response.opentext,
            answered_at: new Date(),
          },
        });
      } else if (response.poll_type === PollType.CONTINUOUS) {
        pollAnswer = await prisma.pollAnswer.create({
          data: {
            user_id: response.user_id,
            poll_id: response.poll_id,
            numeric: response.numeric,
            answered_at: new Date(),
          },
        });
      } else if (response.poll_type === PollType.MULTIPLE_CHOICE || response.poll_type === PollType.STEP_LABELED || response.poll_type === PollType.YES_NO_IDK) {  
        pollAnswer = await prisma.pollAnswer.create({
          data: {
            user_id: response.user_id,
            poll_id: response.poll_id,
            poll_option_id: response.option_id,
            answered_at: new Date(),
          },
        });
      } else {
        throw new Error(`Type de sondage non supporté: ${response.poll_type}`);
      }

      // Créer l'entrée dans PollAnswerSource
      await prisma.pollAnswerSource.create({
        data: {
          source_type: 'CONVERSATION',
          locale: response.locale as LocaleCode,
          conversation_id: response.conversation_id,
          answer: { connect: { poll_answer_id: pollAnswer.poll_answer_id } },
        },
      });

      return pollAnswer;
    });
  }
}
