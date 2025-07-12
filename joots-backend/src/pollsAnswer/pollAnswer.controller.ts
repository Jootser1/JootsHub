import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { PollAnswerService } from './pollAnswer.service';

@Controller('poll-answers')
export class PollAnswerController {
  constructor(private readonly pollAnswerService: PollAnswerService) {}

  @Get('by-poll/:pollId')
  async getAnswersByPoll(@Param('pollId') pollId: string) {
    return this.pollAnswerService.getAnswersByPoll(pollId);
  }

  @Get('by-poll-with-history/:pollId')
  async getAnswersByPollWithHistory(@Param('pollId') pollId: string) {
    return this.pollAnswerService.getAnswersByPollWithHistory(pollId);
  }

  @Get('by-user/:userId')
  async getAnswersByUser(@Param('userId') userId: string) {
    return this.pollAnswerService.getAnswersByUser(userId);
  }

  @Post('submit')
  async submitAnswer(@Body() body: any) {
    return this.pollAnswerService.submitAnswer(body);
  }

  @Get('by-user-category/:userId-categoryId')
  async getAnswersByUserAndCategory(userId: string, categoryId: number) {
    return this.pollAnswerService.getAnswersByUserAndCategory(userId, categoryId);
  }

  @Get('by-conversation/:conversationId')
  async getAnswersByConversation(conversationId: string) {
    return this.pollAnswerService.getAnswersByConversation(conversationId);
  }

  @Get('by-community/:userId')
  async getCommunityAnswersForUser(userId: string) {
    return this.pollAnswerService.getCommunityAnswersForUser(userId);
  }

}
