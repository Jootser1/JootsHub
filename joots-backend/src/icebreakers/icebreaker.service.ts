import { Injectable, forwardRef, Inject, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { CurrentPollWithRelations } from '@shared/question.types';
import { ChatGateway } from '../gateways/chat.gateway';
import { MessagesService } from '../messages/messages.service';
import { ConversationsService } from '../conversations/conversations.service';
import { xp_and_level } from '@shared/conversation.types';
import { postedResponse } from '@shared/icebreaker.types';
import { LocaleCode } from '@shared/locale.types';

@Injectable()
export class IcebreakerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    @Inject(forwardRef(() => ChatGateway))
    private readonly chatGateway: ChatGateway,
    private readonly messagesService: MessagesService,
    private readonly conversationsService: ConversationsService,
    private readonly logger: Logger
  ) {}
  
  async updateParticipantIcebreakerReady(
    conversationId: string,
    userId: string,
    isIcebreakerReady: boolean
  ) {
    await this.prisma.conversationParticipant.updateMany({
      where: { conversation_id: conversationId, user_id: userId },
      data: { is_icebreaker_ready: isIcebreakerReady },
    });
    
    await this.redis.hset(
      `conversation:${conversationId}:participants`,
      userId,
      JSON.stringify({
        is_icebreaker_ready: isIcebreakerReady,
        timestamp: new Date().toISOString(),
      })
    );
  }
  
  async areAllParticipantsReady(conversationId: string): Promise<boolean> {
    // Vérifier d'abord le statut des participants dans Redis
    const redisParticipants = await this.redis.hgetall(`conversation:${conversationId}:participants`);
    console.log('Redis participants', redisParticipants);
    
    if (Object.keys(redisParticipants).length > 0) {
      const result = Object.values(redisParticipants).every((participant) => {
        const parsedParticipant = JSON.parse(participant);
        console.log('Parsed participant from Redis:', parsedParticipant);
        return parsedParticipant.is_icebreaker_ready;
      });
      console.log('Redis check result:', result);
      return result;
    }
    
    // Si les données ne sont pas disponibles dans Redis, aller chercher dans la base de données
    const participants = await this.prisma.conversationParticipant.findMany({
      where: { conversation_id: conversationId },
    });
    console.log('DB participants:', participants.map(p => ({ user_id: p.user_id, is_icebreaker_ready: p.is_icebreaker_ready })));
    
    const dbResult = participants.every((p) => p.is_icebreaker_ready);
    console.log('DB check result:', dbResult);
    return dbResult;
  }
  
  private async updateParticipantsHasGivenAnswerStatus(
    conversationId: string,
    userId: string,
    has_given_answer: boolean
  ) {
    await this.prisma.conversationParticipant.updateMany({
      where: {
        conversation_id: conversationId,
        user_id: userId,
      },
      data: {
        has_given_answer: has_given_answer,
      },
    });
    
    // Récupérer les données existantes pour les merger
    const redisParticipants = await this.redis.hgetall(`conversation:${conversationId}:participants`);
    const existingData = redisParticipants[userId];
    
    let participantData = {
      has_given_answer: has_given_answer,
      timestamp: new Date().toISOString(),
    };
    
    if (existingData) {
      const parsed = JSON.parse(existingData);
      participantData = { ...parsed, ...participantData };
    }
    
    await this.redis.hset(
      `conversation:${conversationId}:participants`,
      userId,
      JSON.stringify(participantData)
    );
  }
  
  async areAllParticipantsHaveGivenAnswer(conversationId: string): Promise<{
    allParticipantsHaveGivenAnswer: boolean;
    userAId: string;
    userBId: string;
  }> {
    // Vérifier d'abord le statut des participants dans Redis
    const redisParticipants = await this.redis.hgetall(`conversation:${conversationId}:participants`);
    if (Object.keys(redisParticipants).length > 0) {
      const allParticipantsHaveGivenAnswer = Object.values(redisParticipants).every((participant) => {
        const parsedParticipant = JSON.parse(participant);
        return parsedParticipant.has_given_answer;
      });
      const userIds = Object.keys(redisParticipants);
      return {
        allParticipantsHaveGivenAnswer,
        userAId: userIds[0],
        userBId: userIds[1],
      };
    }
    
    // Si les données ne sont pas disponibles dans Redis, aller chercher dans la base de données
    const participants = await this.prisma.conversationParticipant.findMany({
      where: { conversation_id: conversationId },
    });
    return {
      allParticipantsHaveGivenAnswer: participants.every(
        (p) => p.has_given_answer
      ),
      userAId: participants[0].user_id,
      userBId: participants[1].user_id,
    };
  }
  
  async storeCurrentPollForAGivenConversation(
    conversationId: string,
    poll: CurrentPollWithRelations
  ) {
    try {
      if (!poll) return;
      await this.redis.set(
        `conversation:${conversationId}:icebreaker:poll`,
        JSON.stringify({
          poll_id: poll.poll_id,
          type: poll.type,
          poll_translations: poll.poll_translations.map(t => ({ translation: t.translation })),
          options: poll.options.map(o => ({
            poll_option_id: o.poll_option_id,
            order: o.order,
            translations: o.translations
          })),
          categories: poll.categories?.map(c => ({
            category_id: c.category_id,
            name: c.name
          })) || []
        })
      );
      
    } catch (error) {
      this.logger.error('Error storing random question:', error);
      throw error;
    }
  }
  
  async processIcebreakersPostResponse(
    postedResponse: postedResponse
  ) {
    // Save User Responses in redis
    await this.saveCurrentUserResponseInRedis(
      postedResponse
    );
    
    // Update participant status has given answer in DB
    await this.updateParticipantsHasGivenAnswerStatus(postedResponse.conversation_id, postedResponse.user_id, true);
    
    const { allParticipantsHaveGivenAnswer } = await this.areAllParticipantsHaveGivenAnswer(postedResponse.conversation_id);
    
    
    if (allParticipantsHaveGivenAnswer) {
      const conversation = await this.conversationsService.fetchConversationByIdWithXpAndLevel(postedResponse.conversation_id);
      const newXp = await this.conversationsService.updateXpToConversationId(conversation.conversation_id, conversation.xp_and_level.difficulty);
      const xpAndLevel = await this.conversationsService.getConversationLevel(newXp, conversation.xp_and_level.difficulty);
      await this.processCompletedBothIcebreakers(conversation.conversation_id, postedResponse.poll_id)
    }
  }
  
  private async saveCurrentUserResponseInRedis(postedResponse: postedResponse) {
    const redisKey = `icebreaker:${postedResponse.conversation_id}:responses:${postedResponse.user_id}`;
    await this.redis.set(
      redisKey,
      JSON.stringify({
        user_id: postedResponse.user_id,
        poll_id: postedResponse.poll_id,
        option_id: postedResponse.option_id ?? null,
        opentext: postedResponse.opentext ?? null,
        numeric: postedResponse.numeric ?? null,
        conversation_id: postedResponse.conversation_id,
        locale: postedResponse.locale,
        answeredAt: new Date().toISOString(),
      }),
      86400
    ); // Expire après 24 heures
  }
  
  private async processCompletedBothIcebreakers(
    conversationId: string,
    pollId: string
  ) {
    
    const { conversation, userAnswers, pollLocalized } = await this.getUserAnswers(conversationId, pollId);
    
    if (userAnswers.length !== 2) {
      this.logger.warn(
        `La conversation ${conversationId} n'a pas exactement 2 réponses pour le poll ${pollId}.`
      );
      return;
    }
    const userAnswerA = {
      userId: userAnswers[0]?.user_id ?? 'defaultUserId',
      questionOption: userAnswers[0]?.option?.translations[0]?.translated_option_text ?? 'defaultOptionText',
    };
    
    const userAnswerB = {
      userId: userAnswers[1]?.user_id ?? 'defaultUserId',
      questionOption: userAnswers[1]?.option?.translations[0]?.translated_option_text ?? 'defaultOptionText',
    };

    
    await this.resetIcebreakerStatus(conversationId);
    const levelData = await this.conversationsService.getConversationLevel(conversation.xp_and_level.reached_xp, conversation.xp_and_level.difficulty);  
    
    // Mapper les propriétés vers ProgressionResult
    const xpAndLevel: xp_and_level = {
      ...levelData
    };
    
    await this.emitResponsesToAllParticipants(
      conversationId,
      pollLocalized?.poll_translations[0]?.translation ?? 'defaultPollTranslation',
      userAnswerA,
      userAnswerB,
      xpAndLevel
    );
    
  }
    
  
  async emitResponsesToAllParticipants(
    conversationId: string,
    questionLabel: string,
    userAnswerA: { userId: string; questionOption: string },
    userAnswerB: { userId: string; questionOption: string },
    xpAndLevel: xp_and_level
  ) {
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
      response2,
      xpAndLevel
    );
  }
    
  
  private async getUserAnswers(
    conversationId: string,
    pollId: string
  ) {
    
    const conversation = await this.conversationsService.fetchConversationByIdWithXpAndLevel(conversationId);
    const conv_locale = conversation.locale as LocaleCode;
    
    const pollLocalized = await this.prisma.poll.findUnique({
      where: { poll_id: pollId },
      select: { poll_translations: { where: { locale: conv_locale } } },
    });
    
    
    const userAnswers = await this.prisma.pollAnswer.findMany({
      where: {
        source: {
          conversation_id: conversationId,
        },
        poll_id: pollId,
      },
      include: {
        source: true,
        option: {
          include: {
            translations: {
              where: {
                locale: conv_locale,
              },
            },
          },
        },
        poll: {
          include: {
            poll_translations: {
              where: {
                locale: conv_locale,
              },
            },
          },
        },
      },
    });
    
    return { conversation, userAnswers, pollLocalized };
  }
  
  
  // Reset icebreaker status in prisma and redis
  private async resetIcebreakerStatus(conversationId: string) {
    // Mettre à jour la base de données
    await this.prisma.conversationParticipant.updateMany({
      where: { conversation_id: conversationId },
      data: {
        is_icebreaker_ready: false,
        has_given_answer: false,
      },
    });
    
    // Mettre à jour Redis
    const redisIcebreakerKey = `icebreaker:ready:${conversationId}`;
    await this.redis.set(
      redisIcebreakerKey,
      JSON.stringify({
        isIcebreakerReady: false,
        hasGivenAnswer: false,
      }),
      86400
    ); // Expire après 24 heures
  }
  
  
}
