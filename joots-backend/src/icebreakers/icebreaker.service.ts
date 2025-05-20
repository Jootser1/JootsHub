import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QuestionGroupWithRelations } from '../types/question';
import { ChatGateway } from '../gateways/chat.gateway';
import { MessagesService } from '../messages/messages.service';

@Injectable()
export class IcebreakerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    @Inject(forwardRef(() => ChatGateway)) private readonly chatGateway: ChatGateway,
    private readonly messagesService: MessagesService,
  ) {}
  
  async setParticipantIcebreakerReady(conversationId: string, userId: string, isIcebreakerReady: boolean) {
    await this.prisma.conversationParticipant.updateMany({
      where: { conversationId, userId },
      data: { isIcebreakerReady: isIcebreakerReady },
    });
    
    await this.redis.hset(
      `conversation:${conversationId}:participants`,
      userId,
      JSON.stringify({ isIcebreakerReady: isIcebreakerReady, timestamp: new Date().toISOString() })
    );
  }
  
  async areAllParticipantsReady(conversationId: string): Promise<boolean> {
    const participants = await this.prisma.conversationParticipant.findMany({ where: { conversationId } });
    return participants.every(p => p.isIcebreakerReady);
  }
  
  async areAllParticipantsHaveGivenAnswer(conversationId: string): Promise<{allParticipantsHaveGivenAnswer: boolean, userAId: string, userBId: string}> {
    const participants = await this.prisma.conversationParticipant.findMany({ where: { conversationId } });
    return {allParticipantsHaveGivenAnswer: participants.every(p => p.hasGivenAnswer), userAId: participants[0].userId, userBId: participants[1].userId};
  }
  
  async storeCurrentQuestionGroupForAGivenConversation(conversationId: string, questionGroup: QuestionGroupWithRelations) {
    try {
      if (!questionGroup) return;
      await this.redis.set(
        `conversation:${conversationId}:icebreaker:questionGroup`,
        JSON.stringify({
          id: questionGroup.id,
          text: questionGroup.questions[0].question,
          timestamp: new Date().toISOString(),
        }),
      );
      console.log("Question group stored in Redis:", questionGroup.id);
    } catch (error) {
      console.error('Error storing random question:', error);
      throw error;
    }
  }
  
  async processIcebreakersPostResponses(userId: string, questionGroupId: string, optionId: string, conversationId: string) {
    // Save User Responses in redis
    await this.saveCurrentUserResponseInRedis(userId, questionGroupId, optionId, conversationId);

    // Update participant status has given answer in DB
    await this.updateParticipantsHasGivenAnswerStatus(conversationId, userId);
    
    const {allParticipantsHaveGivenAnswer} = await this.areAllParticipantsHaveGivenAnswer(conversationId);
    
    if (allParticipantsHaveGivenAnswer) {
      await this.processCompletedIcebreaker(conversationId, questionGroupId);
    }
  }

  private async saveCurrentUserResponseInRedis(userId: string, questionGroupId: string, optionId: string, conversationId: string) {
    const redisKey = `icebreaker:${conversationId}:responses:${userId}`;
    await this.redis.set(redisKey, JSON.stringify({
      userId,
      questionGroupId,
      optionId,
      answeredAt: new Date().toISOString()
    }), 86400); // Expire après 24 heures
  }

  private async updateParticipantsHasGivenAnswerStatus(conversationId: string, userId: string) {
    await this.prisma.conversationParticipant.updateMany({
      where: {
        conversationId,
        userId
      },
      data: {
        hasGivenAnswer: true
      }
    });
  }

  private async processCompletedIcebreaker(conversationId: string, questionGroupId: string) {
    const {userAnswers, questionGroupLocalized} = await this.getUserAnswers(conversationId, questionGroupId);

    if (userAnswers.length !== 2) {
      console.warn(`La conversation ${conversationId} n'a pas exactement 2 réponses pour le groupe de questions ${questionGroupId}.`);
      return;
    }

    const {userAnswerA, userAnswerB, questionLabel} = this.formatUserAnswersForAddIcebreakerMessage(conversationId, questionGroupId, userAnswers, questionGroupLocalized);
    
    await this.addIcebreakerMessage(conversationId, questionLabel, userAnswerA, userAnswerB);
    await this.resetIcebreakerStatus(conversationId);
    await this.emitResponsesToAllParticipants(conversationId, questionLabel, userAnswerA, userAnswerB);
  }

  private async getUserAnswers(conversationId: string, questionGroupId: string) {

    const conversationLocale = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      select: { locale: true }
    });
    console.log('conversationLocale:', conversationLocale);

    const questionGroupLocalized = await this.prisma.questionGroup.findUnique({
      where: { id: questionGroupId },
      select: { questions: { where: { locale: conversationLocale?.locale } } }
    });

    const userAnswers = await this.prisma.userAnswer.findMany({
      where: {
        conversationId,
        questionGroupId
      },
      select: {
        userId: true,
        questionOption: {
          select: {
            label: true,
            locale: true,
          },
        },
        questionGroup: {
          include: {
            questions: {
              where: {
                locale: conversationLocale?.locale
              },
              take: 1,
            }
          }
        }
      }
    });

    return {userAnswers, questionGroupLocalized};
  }

  private formatUserAnswersForAddIcebreakerMessage(conversationId: string, questionGroupId: string, userAnswers: any[], questionGroupLocalized: any) {

    const userAnswerA = {
      userId: userAnswers[0].userId, 
      questionOption: userAnswers[0].questionOption.label
    };
    const userAnswerB = {
      userId: userAnswers[1].userId, 
      questionOption: userAnswers[1].questionOption.label
    };

    const questionLabel = questionGroupLocalized.questions[0].question;
    return { userAnswerA, userAnswerB, questionLabel };
  }

  private async addIcebreakerMessage(
    conversationId: string, 
    questionLabel: string, 
    userAnswerA: { userId: string, questionOption: string }, 
    userAnswerB: { userId: string, questionOption: string }
  ) {
    await this.messagesService.addIcebreakerMessage(
      conversationId, 
      questionLabel, 
      userAnswerA, 
      userAnswerB
    );
  }

  // Reset icebreaker status in prisma and redis
  private async resetIcebreakerStatus(conversationId: string) {
    // Mettre à jour la base de données
    await this.prisma.conversationParticipant.updateMany({
      where: { conversationId },
      data: {
        isIcebreakerReady: false,
        hasGivenAnswer: false
      }
    });
    
    // Mettre à jour Redis
    const redisIcebreakerKey = `icebreaker:ready:${conversationId}`;
    await this.redis.set(redisIcebreakerKey, JSON.stringify({
      isIcebreakerReady: false,
      hasGivenAnswer: false
    }), 86400); // Expire après 24 heures
  }
  
  async emitResponsesToAllParticipants(conversationId: string, questionLabel: string, userAnswerA: { userId: string, questionOption: string }, userAnswerB: { userId: string, questionOption: string }) {
 
    
    // Récupérer les réponses des deux participants depuis Redis
    const user1 = userAnswerA.userId;
    const user2 = userAnswerB.userId;
      
    const response1 = userAnswerA.questionOption;
    const response2 = userAnswerB.questionOption;
    
    // Appeler la méthode du ChatGateway
    await this.chatGateway.emitIcebreakerResponsesToAllParticipants(
      conversationId,
      questionLabel,
      user1,
      response1,
      user2,
      response2
    );
  }
}