import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserGateway } from '../gateways/user.gateway';

@Injectable()
export class ConversationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userGateway: UserGateway,
  ) {}

  private readonly userSelect = {
    id: true,
    username: true,
    avatar: true,
    isOnline: true,
  };

  async findAll(userId: string) {
    try {
      return await this.prisma.conversation.findMany({
        where: {
          participants: {
            some: { userId },
          },
        },
        include: {
          participants: {
            include: {
              user: { select: this.userSelect },
            },
          },
          messages: {
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
        },
        orderBy: { updatedAt: 'desc' },
      });
    } catch (error) {
      console.error('Erreur dans findAll:', error);
      throw error;
    }
  }

  async findOne(id: string, userId: string) {
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        id,
        participants: {
          some: { userId },
        },
      },
      include: {
        participants: {
          include: {
            user: { select: this.userSelect },
          },
        },
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation non trouvée');
    }

    return conversation;
  }

  async findConversation(userId: string, receiverId: string) {
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        AND: [
          { participants: { some: { userId } } },
          { participants: { some: { userId: receiverId } } },
        ],
      },
      include: {
          participants: {
          include: {
            user: { select: this.userSelect },
          },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 50,
          include: {
            sender: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation non trouvée');
    }

    return conversation;
  }

  async create(userId: string, receiverId: string) {
    const [user1, user2] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: userId } }),
      this.prisma.user.findUnique({ where: { id: receiverId } }),
    ]);

    if (!user1 || !user2) {
      throw new NotFoundException('Un ou les deux utilisateurs sont introuvables');
    }

    const existingConversation = await this.prisma.conversation.findFirst({
      where: {
        AND: [
          { participants: { some: { userId } } },
          { participants: { some: { userId: receiverId } } },
        ],
      },
      include: {
        participants: {
          include: {
            user: { select: this.userSelect },
          },
        },
      },
    });

    if (existingConversation) {
      return existingConversation;
    }

    return this.prisma.conversation.create({
      data: {
        participants: {
          create: [
            { userId },
            { userId: receiverId },
          ],
        },
      },
      include: {
        participants: {
          include: {
            user: { select: this.userSelect },
          },
        },
      },
    });
  }

  async findMessages(conversationId: string, userId: string) {
    // Vérifier que l'utilisateur a accès à la conversation
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        id: conversationId,
        participants: {
          some: { userId },
        },
      },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation non trouvée ou accès non autorisé');
    }

    // Récupérer les messages avec les informations de l'expéditeur
    const messages = await this.prisma.message.findMany({
      where: {
        conversationId,
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return messages;
  }
}
