import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PollType } from '@prisma/client';
import { RedisService } from '../redis/redis.service';
import { IcebreakerService } from '../icebreakers/icebreaker.service';
@Injectable()
export class PollService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly icebreakerService: IcebreakerService
  ) {}

  async getUserLastResponseToPoll(
    currentUserId: string,
    pollGroupId: string
  ) {
    return this.prisma.poll.findFirst({
      where: {
        author_id: currentUserId
      },
      orderBy: {
        updated_at: 'desc',
      }
    });
  }

  async getPollsByUser(currentUserId: string) {
    return this.prisma.poll.findMany({
      where: {
        author_id: currentUserId
      }
    })
  }

  async getPollsByCategory(categoryId: number) {
    return this.prisma.poll.findMany({
      where: {
        categories: {
          some: {
            category_id: categoryId,
          },
        },
      },
      include: {
        poll_translations: true,
        categories: { include: { category: true } },
        options: { include: { translations: true } },
      },
    });
  }

  async getNextRandomPoll(userId1: string, userId2: string) {
    // Get all poll IDs answered by user 1
    const answeredPollsUser1 = await this.prisma.pollAnswer.findMany({
      where: { user_id: userId1 },
      select: { poll_id: true },
    });

    // Get all poll IDs answered by user 2
    const answeredPollsUser2 = await this.prisma.pollAnswer.findMany({
      where: { user_id: userId2 },
      select: { poll_id: true },
    });

    const answeredPollIds = [
      ...answeredPollsUser1.map(a => a.poll_id),
      ...answeredPollsUser2.map(a => a.poll_id),
    ];

    // Find polls not answered by either user
    const unansweredPolls = await this.prisma.poll.findMany({
      where: {
        poll_id: { notIn: answeredPollIds },
        is_enabled: true,
      },
      orderBy: { created_at: 'asc' },
      include: {
        poll_translations: true,
        categories: { include: { category: true } },
        options: { include: { translations: true } },
      },
    });

    if (unansweredPolls.length === 0) {
      return null;
    }

    // Pick a random poll
    const randomIndex = Math.floor(Math.random() * unansweredPolls.length);
    return unansweredPolls[randomIndex];
  }

  async saveResponse(
    poll_id: string,
    user_id: string,
    poll_type: PollType,
    conversation_id: string,
    locale: string,
    poll_option_id?: string, // for multiple choice, etc.
    opentext?: string,      // for open questions
    numeric?: number,        // for numeric/scale questions
    comment?: string,
  ) {
    // Build the data object dynamically, only including defined fields
  const data: any = {
    poll_id,
    user_id,
    comment,
  };
    if (poll_option_id !== undefined) data.poll_option_id = poll_option_id;
    if (opentext !== undefined) data.opentext = opentext;
    if (numeric !== undefined) data.numeric = numeric;

    // Vérification des paramètres requis
    if (!user_id || !poll_option_id || !poll_id) {
      throw new Error(
        'Les paramètres userId, questionGroupId et optionId sont requis'
      );
    }

    // 1. Sauvegarder la réponse à la question en BDD
    const savedResponse = await this.saveUserAnswerInDB(
      poll_id, 
      user_id, 
      poll_option_id, // for multiple choice, etc.
      opentext,      // for open questions
      numeric,        // for numeric/scale questions
      comment,
    );

    const postedResponseEvent = {
      poll_id,
      user_id,
      poll_option_id,
      opentext,
      numeric,
      comment,
      poll_type,
      conversation_id,
      locale,
    };

    // 2. Mettre à jour les statuts dans Redis et émettre l'événement via le socket si dans le contexte d'une conversation
    if (savedResponse) {
      await this.icebreakerService.processIcebreakersPostResponse(postedResponseEvent);
    }

    return savedResponse;
  }

  // Méthode spécifique pour enregistrer la réponse en BDD
  async saveUserAnswerInDB(
    poll_id: string,
    user_id: string,
    poll_option_id?: string, // for multiple choice, etc.
    opentext?: string,      // for open questions
    numeric?: number,        // for numeric/scale questions
    comment?: string,
  ) {
    return this.prisma.pollAnswer.create({
      data: {
        poll_id: poll_id,
        user_id: user_id,
        poll_option_id: poll_option_id,
        opentext: opentext,
        numeric: numeric,
        comment: comment,
      },
    });
  }

// 2. Get most answered polls
async getMostAnsweredPolls(limit = 10) {
  return this.prisma.poll.findMany({
    orderBy: {
      answers: { _count: 'desc' },
    },
    take: limit,
    include: {
      poll_translations: true,
      categories: { include: { category: true } },
      options: { include: { translations: true } },
    },
  });
}

  // 3. Get polls in the same language as the user
  async getPollsByUserLanguage(userId: string) {
    // Get user's language
    const user = await this.prisma.user.findUnique({
      where: { user_id: userId },
      select: { user_settings: { select: { app_language: true } } },
    });
    const language = user?.user_settings?.app_language || 'fr_FR';

    return this.prisma.poll.findMany({
      include: {
        poll_translations: {
          where: { locale: language as any},
        },
        categories: { include: { category: true } },
        options: { include: { translations: { where: { locale: language } } } },
      },
    });
  }

  async getPollById(id: string) {
    return this.prisma.poll.findUnique({
      where: { poll_id: id },
      include: {
        poll_translations: true,
        categories: { include: { category: true } },
        options: { include: { translations: true } },
        answers: true,
      },
    });
  }

  async getAll() {
    return this.prisma.poll.findMany({
      include: {
        poll_translations: true,
        categories: { include: { category: true } },
        options: { include: { translations: true } },
      },
    });
  }
}
