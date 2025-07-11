import {Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { PollService } from './poll.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IcebreakerService } from '../icebreakers/icebreaker.service';

@Controller('polls')
export class PollController {
  constructor(
    private readonly pollService: PollService,
    private readonly icebreakerService: IcebreakerService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getPolls(){
    return this.pollService.getAll();
  }


  @UseGuards(JwtAuthGuard)
  @Get('by-id/:id')
  async getPollById(@Param('id') id: string) {
    return this.pollService.getPollById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-user/:userId')
  async getPollsByUser(@Param('userId') userId: string) {
    return this.pollService.getPollsByUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('random')
  async getNextRandomPoll(
    @Query('userId1') userId1: string,
    @Query('userId2') userId2: string
  ) {
    return this.pollService.getNextRandomPoll(userId1, userId2);
  }

  // 1. Get polls by type
  @Get('by-type/:type')
  async getPollsByType(@Param('type') type: string) {
    return this.pollService.getPollsByType(type);
  }

  // 2. Get most answered polls
  @Get('most-answered')
  async getMostAnsweredPolls(@Query('limit') limit?: string) {
    return this.pollService.getMostAnsweredPolls(Number(limit) || 10);
  }

  // 3. Get polls in the same language as the user
  @Get('by-user-language/:userId')
  async getPollsByUserLanguage(@Param('userId') userId: string) {
    return this.pollService.getPollsByUserLanguage(userId);
  }
}
