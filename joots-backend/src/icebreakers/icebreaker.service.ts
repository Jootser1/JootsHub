import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { QuestionGroupWithRelations } from '../../types/question';

@Injectable()
export class IcebreakerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
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

  
}