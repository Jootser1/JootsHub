import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
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
    return this.conversationsService.findAllConversationsForAUserId(
      req.user.sub
    );
  }

  @Get('/messages/:id')
  findMessages(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    if (!req.user?.sub) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.conversationsService.findMessages(id, req.user.sub);
  }

  @Post()
  create(
    @Body() body: { receiverId: string },
    @Req() req: AuthenticatedRequest
  ) {
    if (!req.user?.sub) {
      throw new UnauthorizedException('User not authenticated');
    }
    console.log('body', body)
    return this.conversationsService.create(req.user.sub, body.receiverId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    if (!req.user?.sub) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.conversationsService.fetchConversationById(id);
  }

  @Get('level/:id')
  async getConversationLevel(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    if (!req.user?.sub) {
      throw new UnauthorizedException('User not authenticated');
    }
    const conversation = await this.conversationsService.fetchConversationById(id);
    if (!conversation) {
      throw new NotFoundException('Conversation non trouvée');
    }
    return this.conversationsService.getConversationLevel(conversation.xp_point, conversation.difficulty);
  }
}
