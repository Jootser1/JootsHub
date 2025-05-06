import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QuestionGroupWithRelations } from '../../types/question';

@Injectable()
export class QuestionService {
  constructor(private readonly prisma: PrismaService, private readonly redis: RedisService) {}
  
  async getUserLastResponseToQuestion(currentUserId: string, questionGroupId: string) {
    console.log(Object.keys(this.prisma));
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
  async getNextRandomQuestionGroup(userId1: string, userId2: string): Promise<QuestionGroupWithRelations | null> {
    const answeredQuestionsUser1 = await this.prisma.userAnswer.findMany({
      where: { userId: userId1 },
      select: { questionGroupId: true },
    });
    
    const answeredQuestionsUser2 = await this.prisma.userAnswer.findMany({
      where: { userId: userId2 },
      select: { questionGroupId: true },
    });
    
    const answeredQuestionGroupIdsUser1 = answeredQuestionsUser1.map(answer => answer.questionGroupId);
    const answeredQuestionGroupIdsUser2 = answeredQuestionsUser2.map(answer => answer.questionGroupId);
    
    
    const unansweredQuestionGroups = await this.prisma.questionGroup.findMany({
      where: {
        id: {
          notIn: [...answeredQuestionGroupIdsUser1, ...answeredQuestionGroupIdsUser2],
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        questions: {
          where: {
            locale: 'fr',
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
            locale: 'fr',
          },
        },
      },
    });
    
    // Vérifiez s'il y a des questions non répondues
    if (unansweredQuestionGroups.length === 0) {
      return null; // ou gérez le cas où il n'y a pas de questions disponibles
    }
    
    // Sélectionner un élément aléatoire
    const randomIndex = Math.floor(Math.random() * unansweredQuestionGroups.length);
    const randomUnansweredQuestionGroup = unansweredQuestionGroups[randomIndex];
    console.log('randomUnansweredQuestionGroup', randomUnansweredQuestionGroup);
    return randomUnansweredQuestionGroup;
  }
  
  async saveResponse(userId: string, questionGroupId: string, optionId: string, conversationId: string) {
    console.log('savedResponse', userId, questionGroupId, optionId, conversationId);
    
    // Vérification des paramètres requis
    if (!userId || !questionGroupId || !optionId) {
      throw new Error('Les paramètres userId, questionGroupId et optionId sont requis');
    }
    
    return this.prisma.userAnswer.create({
      data: {
        userId,
        questionGroupId,
        questionOptionId: optionId,
        answeredAt: new Date(),
        ...(conversationId ? { conversationId } : {})
      },
    });
  }
}