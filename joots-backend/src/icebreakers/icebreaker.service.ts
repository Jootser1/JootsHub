import { Injectable, forwardRef, Inject, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { CurrentPollWithRelations } from '@shared/question.types';
import { ChatGateway } from '../gateways/chat.gateway';
import { MessagesService } from '../messages/messages.service';
import { ConversationsService } from '../conversations/conversations.service';
import { ProgressionResult } from '@shared/icebreaker-event.types';
import { postedResponse } from '@shared/icebreaker.types';

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

  async setParticipantIcebreakerReady(
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
        isIcebreakerReady: isIcebreakerReady,
        timestamp: new Date().toISOString(),
      })
    );
  }

  async areAllParticipantsReady(conversationId: string): Promise<boolean> {
    const participants = await this.prisma.conversationParticipant.findMany({
      where: { conversation_id: conversationId },
    });
    return participants.every((p) => p.is_icebreaker_ready);
  }

  async areAllParticipantsHaveGivenAnswer(conversationId: string): Promise<{
    allParticipantsHaveGivenAnswer: boolean;
    userAId: string;
    userBId: string;
  }> {
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

  async processIcebreakersPostResponses(
    postedResponse: postedResponse
  ) {
    // Save User Responses in redis
    await this.saveCurrentUserResponseInRedis(
      postedResponse
    );

    // Update participant status has given answer in DB
    await this.updateParticipantsHasGivenAnswerStatus(postedResponse.conversation_id, postedResponse.user_id);

    const { allParticipantsHaveGivenAnswer } = await this.areAllParticipantsHaveGivenAnswer(postedResponse.conversation_id);
      

    if (allParticipantsHaveGivenAnswer) {
      await this.processCompletedIcebreaker(postedResponse.conversation_id, postedResponse.poll_id);
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

  private async updateParticipantsHasGivenAnswerStatus(
    conversationId: string,
    userId: string
  ) {
    await this.prisma.conversationParticipant.updateMany({
      where: {
        conversation_id: conversationId,
        user_id: userId,
      },
      data: {
        has_given_answer: true,
      },
    });
  }

  private async processCompletedIcebreaker(
    conversationId: string,
    pollId: string
  ) {
    const { conversation, pollAnswers} = await this.getUserAnswers(conversationId, pollId);

    if (pollAnswers.length !== 2) {
      this.logger.warn(
        `La conversation ${conversationId} n'a pas exactement 2 réponses pour le poll ${pollId}.`
      );
      return;
    }


    await this.resetIcebreakerStatus(conversationId);
    const levelData = await this.conversationsService.getConversationLevel(conversation.xp_point, conversation.difficulty);
    
    // Mapper les propriétés vers ProgressionResult
    const xpAndLevel: ProgressionResult = {
      xpPerQuestion: levelData.xpPerQuestion,
      reached_xp: levelData.reachedXP,
      reached_level: levelData.reachedLevel,
      remaining_xp_after_level_up: levelData.remainingXpAfterLevelUp,
      required_xp_for_current_level: levelData.requiredXpForCurrentLevel,
      max_xp_for_next_level: levelData.maxXpForNextLevel,
      next_level: levelData.nextLevel,
      required_xp_for_next_level: levelData.requiredXpForNextLevel,
      reward: levelData.reward,
      photo_reveal_percent: levelData.photo_reveal_percent
    };
    
    /*
    await this.emitResponsesToAllParticipants(
      conversationId,
      questionLabel,
      userAnswerA,
      userAnswerB,
      xpAndLevel
    );
    */
  }

  private async getUserAnswers(
    conversationId: string,
    pollId: string
  ) {

    const conversation = await this.conversationsService.fetchConversationById(conversationId);

    const pollAnswers = await this.prisma.pollAnswer.findMany({
      where: {
        source: {
          conversation_id: conversationId,
        },
        poll_id: pollId,
      },
      include: {
        source: true,
        poll: true,
        option: true,
        user: true,
      },
    });


    

    return { conversation, pollAnswers};
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
        is_icebreaker_ready: false,
        has_given_answer: false,
      }),
      86400
    ); // Expire après 24 heures
  }

  async emitResponsesToAllParticipants(
    conversationId: string,
    questionLabel: string,
    userAnswerA: { user_id: string; option_id: string },
    userAnswerB: { user_id: string; option_id: string },
    xpAndLevel: ProgressionResult
  ) {
    // Récupérer les réponses des deux participants depuis Redis
    const user1 = userAnswerA.user_id;
    const user2 = userAnswerB.user_id;

    const response1 = userAnswerA.option_id;
    const response2 = userAnswerB.option_id;

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
}
