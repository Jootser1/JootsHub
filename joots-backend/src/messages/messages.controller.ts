import { Controller, Get, Post, Body, Param, UseGuards, Req, Patch } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: {
    sub: string;
  };
}

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Patch('conversation/:conversationId/read')
  markAsRead(@Param('conversationId') conversationId: string, @Req() req: AuthenticatedRequest) {
    return this.messagesService.markAsRead(conversationId, req.user.sub);
  }
}
