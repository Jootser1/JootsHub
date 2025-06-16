import { Injectable, forwardRef, Inject, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { PollWithRelations } from '../types/question';
import { ChatGateway } from '../gateways/chat.gateway';
import { MessagesService } from '../messages/messages.service';
import { ConversationsService } from '../conversations/conversations.service';
import { ProgressionResult } from '@shared/conversation.types';
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
    poll: PollWithRelations
  ) {
    try {
      if (!poll) return;
      await this.redis.set(
        `conversation:${conversationId}:icebreaker:poll`,
        JSON.stringify({
          id: poll.poll_id,
          text: poll.poll_translations[0].translation,
          timestamp: new Date().toISOString(),
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
      postedResponse.userId,
      postedResponse.pollId,
      postedResponse.optionId,
      postedResponse.conversationId,
    );

    // Update participant status has given answer in DB
    await this.updateParticipantsHasGivenAnswerStatus(postedResponse.conversationId, postedResponse.userId);

    const { allParticipantsHaveGivenAnswer } = await this.areAllParticipantsHaveGivenAnswer(postedResponse.conversationId);
      

    if (allParticipantsHaveGivenAnswer) {
      await this.processCompletedIcebreaker(postedResponse.conversationId, postedResponse.pollId);
    }
  }

  private async saveCurrentUserResponseInRedis(
    userId: string,
    pollId: string,
    optionId: string,
    conversationId: string,
  ) {
    const redisKey = `icebreaker:${conversationId}:responses:${userId}`;
    await this.redis.set(
      redisKey,
      JSON.stringify({
        userId,
        pollId,
        optionId,
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
      reachedXP: levelData.reachedXP,
      reachedLevel: levelData.reachedLevel,
      remainingXpAfterLevelUp: levelData.remainingXpAfterLevelUp,
      requiredXpForCurrentLevel: levelData.requiredXpForCurrentLevel,
      maxXpForNextLevel: levelData.maxXpForNextLevel,
      nextLevel: levelData.nextLevel,
      requiredXpForNextLevel: levelData.requiredXpForNextLevel,
      reward: levelData.reward,
      photoRevealPercent: levelData.photoRevealPercent
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
    console.log(pollAnswers);


    

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
