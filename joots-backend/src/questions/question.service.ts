import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QuestionGroupWithRelations } from '../types/question';
import { IcebreakerService } from '../icebreakers/icebreaker.service';
@Injectable()
export class QuestionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly icebreakerService: IcebreakerService
  ) {}

  async getUserLastResponseToQuestion(
    currentUserId: string,
    questionGroupId: string
  ) {
    return this.prisma.userAnswer.findFirst({
      where: {
        userId: currentUserId,
        questionGroupId,
      },
      orderBy: {
        answeredAt: 'desc',
      },
      include: {
        questionOption: true,
      },
    });
  }

  async getQuestionGroup(questionGroupId: string) {
    return this.prisma.questionGroup.findUnique({
      where: { id: questionGroupId },
    });
  }

  // To improve later by adding
  // the selection to trendy questions first,
  // Respect to preferences defined by the users
  // Selecting questions unanswered by both users
  // if no question, favor the one answered by only one,
  // if none, the oldest one
  async getNextRandomQuestionGroup(
    userId1: string,
    userId2: string
  ): Promise<QuestionGroupWithRelations | null> {
    const answeredQuestionsUser1 = await this.prisma.userAnswer.findMany({
      where: { userId: userId1 },
      select: { questionGroupId: true },
    });

    const answeredQuestionsUser2 = await this.prisma.userAnswer.findMany({
      where: { userId: userId2 },
      select: { questionGroupId: true },
    });

    const answeredQuestionGroupIdsUser1 = answeredQuestionsUser1.map(
      (answer) => answer.questionGroupId
    );
    const answeredQuestionGroupIdsUser2 = answeredQuestionsUser2.map(
      (answer) => answer.questionGroupId
    );

    const unansweredQuestionGroups = await this.prisma.questionGroup.findMany({
      where: {
        id: {
          notIn: [
            ...answeredQuestionGroupIdsUser1,
            ...answeredQuestionGroupIdsUser2,
          ],
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        questions: {
          where: {
            locale: 'fr_FR',
          },
        },
        categories: {
          include: {
            category: {
              include: {
                translations: {
                  where: {
                    locale: 'fr_FR',
                  },
                },
              },
            },
          },
        },
        options: {
          where: {
            locale: 'fr_FR',
          },
        },
      },
    });

    // Vérifiez s'il y a des questions non répondues
    if (unansweredQuestionGroups.length === 0) {
      return null; // ou gérez le cas où il n'y a pas de questions disponibles
    }

    // Sélectionner un élément aléatoire
    const randomIndex = Math.floor(
      Math.random() * unansweredQuestionGroups.length
    );
    const randomUnansweredQuestionGroup = unansweredQuestionGroups[randomIndex];
    return randomUnansweredQuestionGroup;
  }

  async saveResponse(
    userId: string,
    questionGroupId: string,
    optionId: string,
    conversationId: string
  ) {

    // Vérification des paramètres requis
    if (!userId || !questionGroupId || !optionId) {
      throw new Error(
        'Les paramètres userId, questionGroupId et optionId sont requis'
      );
    }

    // 1. Sauvegarder la réponse à la question en BDD
    const savedResponse = await this.saveUserAnswerInDB(
      userId,
      questionGroupId,
      optionId,
      conversationId
    );

    // 2. Mettre à jour les statuts dans Redis et émettre l'événement via le socket si dans le contexte d'une conversation
    if (conversationId) {
      await this.icebreakerService.processIcebreakersPostResponses(
        userId,
        questionGroupId,
        optionId,
        conversationId
      );
    }

    return savedResponse;
  }

  // Méthode spécifique pour enregistrer la réponse en BDD
  async saveUserAnswerInDB(
    userId: string,
    questionGroupId: string,
    optionId: string,
    conversationId: string
  ) {
    return this.prisma.userAnswer.create({
      data: {
        userId: userId,
        questionGroupId: questionGroupId,
        questionOptionId: optionId,
        answeredAt: new Date(),
        ...(conversationId ? { conversationId } : {}),
      },
    });
  }
}
