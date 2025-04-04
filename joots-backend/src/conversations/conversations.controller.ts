import { Controller, Get, Post, Body, Param, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    sub: string;
  };
}

@Controller('conversations')
@UseGuards(JwtAuthGuard)
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Get()
  findAll(@Req() req: AuthenticatedRequest) {
    if (!req.user?.sub) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.conversationsService.findAll(req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    if (!req.user?.sub) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.conversationsService.findOne(id, req.user.sub);
  }

  @Get(':id/messages')
  findMessages(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    if (!req.user?.sub) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.conversationsService.findMessages(id, req.user.sub);
  }

  @Post()
  create(@Body() body: { receiverId: string }, @Req() req: AuthenticatedRequest) {
    if (!req.user?.sub) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.conversationsService.create(req.user.sub, body.receiverId);
  }
}