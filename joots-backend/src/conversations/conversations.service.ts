import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserGateway } from '../gateways/user.gateway';
import { UserContactsService } from '../users/contacts/contacts.service';
import { ProgressionResult } from '../types/chat';
import { XP_CONFIG } from 'src/config/points_per_difficulty';
import levelConfig from '../config/leveling_config_seed.json';

@Injectable()
export class ConversationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userGateway: UserGateway,
    private readonly userContactsService: UserContactsService
  ) {}

  private readonly userSelect = {
    id: true,
    username: true,
    avatar: true,
    isOnline: true,
  };



  async findAllConversationsForAUserId(userId: string) {
    try {
      return await this.prisma.conversation.findMany({
        where: {
          participants: {
            some: { userId },
          },
        },
        select: {
          id: true,
          updatedAt: true,
          participants: {
            select: {
              user: {
                select: this.userSelect,
              },
              isIcebreakerReady: true,
            },
          },
          messages: {
            orderBy: { createdAt: 'desc' },
            take: 1,
            select: {
              id: true,
              content: true,
              createdAt: true,
              senderId: true,
            },
          },
        },
        orderBy: { updatedAt: 'desc' },
      });
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des conversations pour l'utilisateur:",
        error
      );
      throw error;
    }
  }

  async findAllConversationsIdsForAUserId(userId: string): Promise<string[]> {
    const conversations = await this.prisma.conversation.findMany({
      where: {
        participants: { some: { userId } },
      },
      select: { id: true },
    });
    return conversations.map((conversation) => conversation.id);
  }

  async fetchConversationById(id: string, userId?: string) {
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        id,
        participants: {
          some: { userId: userId ?? undefined },
        },
      },
      select: {
        id: true,
        xpPoint: true,
        difficulty: true,
        locale: true,
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

    const xpAndLevel = await this.getConversationLevel(conversation.xpPoint, conversation.difficulty);
    
    return {
      ...conversation,
      xpAndLevel
    };
  }

  async findConversation(userId: string, receiverId: string) {
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        AND: [
          { participants: { some: { userId } } },
          { participants: { some: { userId: receiverId } } },
        ],
      },
      select: {
        id: true,
        xpPoint: true,
        difficulty: true,
        locale: true,
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
      throw new NotFoundException(
        'Un ou les deux utilisateurs sont introuvables'
      );
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

    try {
      // Créer les contacts réciproques de manière séquentielle pour éviter les erreurs en cascade
      await this.userContactsService.addUserContactinBDD(user1.id, user2.id);
      await this.userContactsService.addUserContactinBDD(user2.id, user1.id);
    } catch (error) {
      console.error('Erreur lors de la création des contacts:', error);
    }

    // Gestion des sockets de manière optionnelle
    try {
      const socketId1 = this.userGateway.findSocketIdByUserId(user1.id);
      const socketId2 = this.userGateway.findSocketIdByUserId(user2.id);

      if (socketId1 && socketId2) {
        // Utiliser les rooms Socket.IO avec la nouvelle API
        const room1 = `user-status-${user1.id}`;
        const room2 = `user-status-${user2.id}`;

        // Ajouter les sockets aux rooms respectives
        this.userGateway.server.in(socketId1).socketsJoin(room2);
        this.userGateway.server.in(socketId2).socketsJoin(room1);

        // Émettre les événements de changement de statut avec un timeout
        const statusData1 = {
          userId: user1.id,
          isOnline: user1.isOnline,
          timestamp: new Date().toISOString(),
        };

        const statusData2 = {
          userId: user2.id,
          isOnline: user2.isOnline,
          timestamp: new Date().toISOString(),
        };
        // Émettre avec un timeout pour éviter les problèmes de connexion
        setTimeout(() => {
          this.userGateway.server
            .to(room1)
            .emit('userStatusChange', statusData1);
          this.userGateway.server
            .to(room2)
            .emit('userStatusChange', statusData2);
        }, 100);
      }
    } catch (socketError) {
      console.warn('Erreur lors de la gestion des sockets:', socketError);
      // On continue même si la gestion des sockets échoue
    }

    // Créer la conversation
    return this.prisma.conversation.create({
      data: {
        participants: {
          create: [{ userId }, { userId: receiverId }],
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
      throw new NotFoundException(
        'Conversation non trouvée ou accès non autorisé'
      );
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

    return messages.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }

  async getConversationLevel(xpPoint: number, difficulty: string) {
    const levels = levelConfig.filter(config => config.difficulty === difficulty);
    const currentXp = xpPoint;
    
    // je veux le dernier niveau qui a un xpRequired inférieur ou égal à currentXp
    const currentLevel = levels.reduce((prev, curr) => {
      return (currentXp >= curr.xpRequired) ? curr : prev;
    }, null);
    if (!currentLevel) {
      throw new NotFoundException('Level non trouvé');
    }
    const nextLevel = levels.find(config => config.xpRequired > currentXp);
    const levelData = {
      xpPerQuestion: XP_CONFIG.QUESTION_DIFFICULTY[difficulty],
      reachedXP: currentXp,
      reachedLevel: currentLevel.level,
      remainingXpAfterLevelUp: currentXp - currentLevel.xpRequired,
      requiredXpForCurrentLevel: currentLevel.xpRequired,
      maxXpForNextLevel: nextLevel ? nextLevel.xpRequired : 0,
      nextLevel: nextLevel ? nextLevel.level : 0,
      reward: currentLevel.reward,
      photoRevealPercent: currentLevel.photoRevealPercent
    }
    return levelData;
  }

  async updateXpToConversationId(conversationId: string, difficulty: string) {
    if (!conversationId) throw new Error('Conversation not found'); 
   const xpPerQuestion = XP_CONFIG.QUESTION_DIFFICULTY[difficulty];

    // Étape 2 — Ajouter l'XP
    const updatedXp = await this.prisma.conversation.update({
      where: { id: conversationId },
      data: {
        xpPoint: { increment: xpPerQuestion },
      },
    });
    return updatedXp.xpPoint
  }
}
