import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QuestionGroupWithRelations } from '../../types/question';
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
    // Sauvegarder dans Redis
    const redisKey = `icebreaker:response:${conversationId}:${userId}`;
    await this.redis.set(redisKey, JSON.stringify({
      userId,
      questionGroupId,
      optionId,
      answeredAt: new Date().toISOString()
    }), 86400); // Expire après 24 heures
    
    // Mettre à jour le statut du participant
    await this.prisma.conversationParticipant.updateMany({
      where: {
        conversationId,
        userId
      },
      data: {
        hasGivenAnswer: true
      }
    });
    
    // Vérifier si tous les participants ont donné une réponse
    const {allParticipantsHaveGivenAnswer, userAId, userBId} = await this.areAllParticipantsHaveGivenAnswer(conversationId);
    
    // Mettre à jour isIcebreakerReady et hasGivenAnswer à false pour les deux participants
    if (allParticipantsHaveGivenAnswer) {

      const userAnswers = await this.prisma.userAnswer.findMany({
        where: {
          conversationId,
          questionGroupId
        },
        include: {
          questionOption: {
            select: {
              label: true
            }
          },
          user: {
            select: {
              id: true,
              username: true
            }
          },
          questionGroup: {
            include: {
              questions: {
                where: {
                  locale: 'fr_FR'
                }
              }
            }
          }
        }
      });

      if (userAnswers.length !== 2) {
        console.warn(`La conversation ${conversationId} n'a pas exactement 2 réponses pour le groupe de questions ${questionGroupId}.`);
        return;
      }

      const userAnswerA = userAnswers[0];
      const userAnswerB = userAnswers[1];

      const questionLabel = userAnswerA.questionOption.label; // Supposons que les deux utilisateurs ont répondu à la même question

      console.log(`Question: ${questionLabel}`);
      console.log(`Utilisateur A: ${userAnswerA.user.username}, Réponse: ${userAnswerA.questionOption.label}`);
      console.log(`Utilisateur B: ${userAnswerB.user.username}, Réponse: ${userAnswerB.questionOption.label}`);



      //const savedResponse = await this.messagesService.addIcebreakerMessage(conversationId, questionLabel, userAnswerA, userAnswerB);

      await this.prisma.conversationParticipant.updateMany({
        where: {
          conversationId
        },
        data: {
          isIcebreakerReady: false,
          hasGivenAnswer: false
        }
      });
      
      // Mettre à jour Redis pour indiquer que l'icebreaker est prêt
      const redisIcebreakerKey = `icebreaker:ready:${conversationId}`;
      await this.redis.set(redisIcebreakerKey, JSON.stringify({
        isIcebreakerReady: false,
        hasGivenAnswer: false
      }), 86400); // Expire après 24 heures
    
      // Émettre les réponses à tous les participants
      await this.emitResponsesToAllParticipants(conversationId, questionGroupId);
    }
  }
  
  async emitResponsesToAllParticipants(conversationId: string, questionGroupId: string) {
    // Récupérer tous les participants de la conversation
    const participants = await this.prisma.conversationParticipant.findMany({
      where: { conversationId },
      select: { userId: true }
    });
    
    if (participants.length !== 2) {
      console.warn(`La conversation ${conversationId} n'a pas exactement 2 participants.`);
      return;
    }
    
    // Récupérer les réponses des deux participants depuis Redis
    const user1 = participants[0].userId;
    const user2 = participants[1].userId;
    
    const response1Key = `icebreaker:response:${conversationId}:${user1}`;
    const response2Key = `icebreaker:response:${conversationId}:${user2}`;
    
    const response1 = await this.redis.get(response1Key);
    const response2 = await this.redis.get(response2Key);
    
    if (!response1 || !response2) {
      console.warn(`Réponses incomplètes pour la conversation ${conversationId}`);
      return;
    }
    
    const parsedResponse1 = JSON.parse(response1);
    const parsedResponse2 = JSON.parse(response2);
    
    // Appeler la méthode du ChatGateway
    await this.chatGateway.emitIcebreakerResponsesToAllParticipants(
      conversationId,
      questionGroupId,
      user1,
      parsedResponse1.optionId,
      user2,
      parsedResponse2.optionId
    );
  }
}