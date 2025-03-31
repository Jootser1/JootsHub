import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserGateway } from '../gateways/user.gateway';

@Injectable()
export class ConversationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userGateway: UserGateway,
  ) {}

  async findAll(userId: string) {
    return this.prisma.conversation.findMany({
      where: {
        OR: [
          { initiatorId: userId },
          { receiverId: userId }
        ]
      },
      include: {
        initiator: {
          select: {
            id: true,
            username: true,
            avatar: true,
            isOnline: true,
          },
        },
        receiver: {
          select: {
            id: true,
            username: true,
            avatar: true,
            isOnline: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  async findOne(id: string, userId: string) {
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        id,
        OR: [
          { initiatorId: userId },
          { receiverId: userId }
        ]
      },
      include: {
        initiator: {
          select: {
            id: true,
            username: true,
            avatar: true,
            isOnline: true,
          },
        },
        receiver: {
          select: {
            id: true,
            username: true,
            avatar: true,
            isOnline: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: 'asc',
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
    // Vérifier si une conversation existe déjà
    const existingConversation = await this.prisma.conversation.findFirst({
      where: {
        OR: [
          {
            AND: [{ initiatorId: userId }, { receiverId: receiverId }],
          },
          {
            AND: [{ initiatorId: receiverId }, { receiverId: userId }],
          },
        ],
      },
      include: {
        initiator: {
          select: {
            id: true,
            username: true,
            avatar: true,
            isOnline: true,
          },
        },
        receiver: {
          select: {
            id: true,
            username: true,
            avatar: true,
            isOnline: true,
          },
        },
      },
    });

    if (existingConversation) {
      return existingConversation;
    }

    // Créer une nouvelle conversation
    return this.prisma.conversation.create({
      data: {
        initiatorId: userId,
        receiverId: receiverId,
      },
      include: {
        initiator: {
          select: {
            id: true,
            username: true,
            avatar: true,
            isOnline: true,
          },
        },
        receiver: {
          select: {
            id: true,
            username: true,
            avatar: true,
            isOnline: true,
          },
        },
      },
    });
  }

  async findConversation(userId: string, receiverId: string) {
    try {
      const conversation = await this.prisma.conversation.findFirst({
        where: {
          OR: [
            {
              AND: [{ initiatorId: userId }, { receiverId: receiverId }],
            },
            {
              AND: [{ initiatorId: receiverId }, { receiverId: userId }],
            },
          ],
        },
        include: {
          initiator: {
            select: {
              id: true,
              username: true,
              avatar: true,
              isOnline: true,
            },
          },
          receiver: {
            select: {
              id: true,
              username: true,
              avatar: true,
              isOnline: true,
            },
          },
          messages: {
            orderBy: {
              createdAt: "desc",
            },
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
        throw new NotFoundException('Conversation not found');
      }

      return conversation;
    } catch (error) {
      console.error('Erreur dans findConversation:', error);
      throw error;
    }
  }

  async createConversation(userId: string, receiverId: string) {
    try {
      // Vérifier si les utilisateurs existent
      const [initiator, receiver] = await Promise.all([
        this.prisma.user.findUnique({ where: { id: userId } }),
        this.prisma.user.findUnique({ where: { id: receiverId } })
      ]);

      if (!initiator || !receiver) {
        throw new Error('Un ou les deux utilisateurs n\'existent pas');
      }

      // Vérifier si une conversation existe déjà
      const existingConversation = await this.prisma.conversation.findFirst({
        where: {
          OR: [
            {
              AND: [{ initiatorId: userId }, { receiverId: receiverId }],
            },
            {
              AND: [{ initiatorId: receiverId }, { receiverId: userId }],
            },
          ],
        },
      });

      if (existingConversation) {
        throw new Error('Une conversation existe déjà entre ces utilisateurs');
      }

      // Créer une nouvelle conversation
      const newConversation = await this.prisma.conversation.create({
        data: {
          initiatorId: userId,
          receiverId: receiverId,
        },
        include: {
          initiator: {
            select: {
              id: true,
              username: true,
              avatar: true,
              isOnline: true,
            },
          },
          receiver: {
            select: {
              id: true,
              username: true,
              avatar: true,
              isOnline: true,
            },
          },
          messages: {
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

      // Émettre l'événement de nouvelle conversation
      this.userGateway.emitNewConversation(newConversation, userId, receiverId);

      return newConversation;
    } catch (error) {
      console.error('Erreur dans createConversation:', error);
      throw error;
    }
  }

  async getAllConversations(userId: string) {
    try {
      const conversations = await this.prisma.conversation.findMany({
        where: {
          OR: [
            { initiatorId: userId },
            { receiverId: userId }
          ]
        },
        include: {
          initiator: {
            select: {
              id: true,
              username: true,
              avatar: true,
              isOnline: true,
            },
          },
          receiver: {
            select: {
              id: true,
              username: true,
              avatar: true,
              isOnline: true,
            },
          },
          messages: {
            orderBy: {
              createdAt: "desc",
            },
            take: 1,
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
        orderBy: {
          updatedAt: "desc",
        },
      });

      return conversations;
    } catch (error) {
      console.error('Erreur dans getAllConversations:', error);
      throw error;
    }
  }
}