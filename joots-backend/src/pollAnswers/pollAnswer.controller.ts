import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { PollAnswerService } from './pollAnswer.service';

@Controller('poll-answers')
export class PollAnswerController {
  constructor(private readonly pollAnswerService: PollAnswerService) {}

  @Get('by-poll/:pollId')
  async getAnswersByPoll(@Param('pollId') pollId: string) {
    return this.pollAnswerService.getAnswersByPoll(pollId);
  }

  @Get('by-user/:userId')
  async getAnswersByUser(@Param('userId') userId: string) {
    return this.pollAnswerService.getAnswersByUser(userId);
  }

  @Post('submit')
  async submitAnswer(@Body() body: any) {
    return this.pollAnswerService.submitAnswer(body);
  }
} 