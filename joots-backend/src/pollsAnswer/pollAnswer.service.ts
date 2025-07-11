import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PollAnswerService {
  constructor(private readonly prisma: PrismaService) {}

  async getAnswersByPoll(pollId: string) {
    return this.prisma.pollAnswer.findMany({
      where: { poll_id: pollId },
      include: {
        user: true,
        option: true,
      },
    });
  }

  async getAnswersByUser(userId: string) {
    return this.prisma.pollAnswer.findMany({
      where: { user_id: userId },
      include: {
        poll: true,
        option: true,
      },
    });
  }

  async submitAnswer(data: {
    poll_id: string;
    user_id: string;
    poll_option_id?: string;
    opentext?: string;
    numeric?: number;
    comment?: string;
  }) {
    return this.prisma.pollAnswer.create({
      data: {
        poll_id: data.poll_id,
        user_id: data.user_id,
        poll_option_id: data.poll_option_id,
        opentext: data.opentext,
        numeric: data.numeric,
        comment: data.comment,
      },
    });
  }

  // 1. Get answers by user and category
  async getAnswersByUserAndCategory(userId: string, categoryId: number) {
    return this.prisma.pollAnswer.findMany({
      where: {
        user_id: userId,
        poll: {
          categories: {
            some: { category_id: categoryId }
          }
        }
      },
      include: {
        poll: {
          include: {
            categories: { include: { category: true } }
          }
        }
      }
    });
  }

  // 2. Get answers for a specific conversation
  async getAnswersByConversation(conversationId: string) {
    return this.prisma.pollAnswer.findMany({
      where: { source: { conversation_id: conversationId } },
      orderBy: { answered_at: 'asc' }
    });
  }

  // 3b. Get answers for a specific poll (with history)
  async getAnswersByPollWithHistory(pollId: string) {
    return this.prisma.pollAnswer.findMany({
      where: { poll_id: pollId },
      include: { histories: true }
    });
  }

  // 4. Get answers to a given poll (alias for getAnswersByPoll)
  async getAnswersToPoll(pollId: string) {
    return this.getAnswersByPoll(pollId);
  }

  // 5. Get poll answers for a conversation ordered by date
  async getAnswersByConversationOrdered(conversationId: string) {
    return this.prisma.pollAnswer.findMany({
      where: { source: { conversation_id: conversationId } },
      orderBy: { answered_at: 'asc' }
    });
  }

  // 6. Get answers to questions a user answered, but by people in their direct community
  async getCommunityAnswersForUser(userId: string) {
    // Get direct community user IDs (example: via contacts)
    const contacts = await this.prisma.userContact.findMany({
      where: { user_id: userId },
      select: { contact_id: true }
    });
    const communityUserIds = contacts.map(c => c.contact_id);

    // Get poll IDs the user has answered
    const userPollIds = await this.prisma.pollAnswer.findMany({
      where: { user_id: userId },
      select: { poll_id: true }
    });
    const pollIds = userPollIds.map(a => a.poll_id);

    // Get answers to those polls by people in the community
    return this.prisma.pollAnswer.findMany({
      where: {
        poll_id: { in: pollIds },
        user_id: { in: communityUserIds }
      }
    });
  }
}
