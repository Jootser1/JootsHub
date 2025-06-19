import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserGateway } from '../gateways/user.gateway';
import { UserContactsService } from '../users/contacts/contacts.service';
import { XP_CONFIG } from 'src/config/points_per_difficulty';
import levelConfig from '../config/leveling_config_seed.json';
import { AppLogger } from '../logger/logger.service';

@Injectable()
export class ConversationsService {
  private readonly logger = new AppLogger();

  constructor(
    private readonly prisma: PrismaService,
    private readonly userGateway: UserGateway,
    private readonly userContactsService: UserContactsService
  ) {}

  private readonly userSelect = {
    user_id: true,
    username: true,
    avatar: true,
    last_seen: true,
  };



  async findAllConversationsForAUserId(userId: string) {
    try {
      return await this.prisma.conversation.findMany({
        where: {
          participants: {
            some: { user_id: userId },
          },
        },
        select: {
          conversation_id: true,
          updated_at: true,
          participants: {
            select: {
              user: {
                select: this.userSelect,
              },
              is_icebreaker_ready: true,
            },
          },
          messages: {
            orderBy: { created_at: 'desc' },
            take: 1,
            select: {
              message_id: true,
              content: true,
              created_at: true,
              sender_id: true,
            },
          },
        },
        orderBy: { updated_at: 'desc' },
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
        participants: { some: { user_id: userId } },
      },
      select: { conversation_id: true },
    });
    return conversations.map((conversation) => conversation.conversation_id);
  }

  async fetchConversationById(id: string, userId?: string) {
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        conversation_id: id,
        participants: {
          some: { user_id: userId ?? undefined },
        },
      },
      select: {
        conversation_id: true,
        xp_point: true,
        difficulty: true,
        locale: true,
        participants: {
          include: {
            user: { select: this.userSelect },
          },
        },
        messages: {
          orderBy: { created_at: 'asc' },
        },
      },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation non trouvée');
    }

    const xpAndLevel = await this.getConversationLevel(conversation.xp_point, conversation.difficulty);
    
    return {
      ...conversation,
      xpAndLevel
    };
  }

  async findConversation(userId: string, receiverId: string) {
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        AND: [
          { participants: { some: { user_id: userId } } },
          { participants: { some: { user_id: receiverId } } },
        ],
      },
      select: {
        conversation_id: true,
        xp_point: true,
        difficulty: true,
        locale: true,
        participants: {
          include: {
            user: { select: this.userSelect },
          },
        },
        messages: {
          orderBy: { created_at: 'desc' },
          take: 50,
          include: {
            sender: {
              select: {
                user_id: true,
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

  async getConversationLocale(conversationId: string) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { conversation_id: conversationId },
      select: { locale: true },
    });
    if (!conversation) {
      throw new NotFoundException('Conversation non trouvée');
    }
    return conversation.locale;
  }

  async create(userId: string, receiverId: string) {
    const [user1, user2] = await Promise.all([
      this.prisma.user.findUnique({ where: { user_id: userId } }),
      this.prisma.user.findUnique({ where: { user_id: receiverId } }),
    ]);
    if (!user1 || !user2) {
      throw new NotFoundException(
        'Un ou les deux utilisateurs sont introuvables'
      );
    }
    const existingConversation = await this.prisma.conversation.findFirst({
      where: {
        AND: [
          { participants: { some: { user_id: userId } } },
          { participants: { some: { user_id: receiverId } } },
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
      await this.userContactsService.addUserContactinBDD(user1.user_id, user2.user_id);
      await this.userContactsService.addUserContactinBDD(user2.user_id, user1.user_id);
    } catch (error) {
      console.error('Erreur lors de la création des contacts:', error);
    }

    // Gestion des sockets de manière optionnelle
    try {
      const socketId1 = this.userGateway.findSocketIdByUserId(user1.user_id);
      const socketId2 = this.userGateway.findSocketIdByUserId(user2.user_id);

      if (socketId1 && socketId2) {
        // Utiliser les rooms Socket.IO avec la nouvelle API
        const room1 = `user-status-${user1.user_id}`;
        const room2 = `user-status-${user2.user_id}`;

        // Ajouter les sockets aux rooms respectives
        this.userGateway.server.in(socketId1).socketsJoin(room2);
        this.userGateway.server.in(socketId2).socketsJoin(room1);

      }
    } catch (socketError) {
      console.warn('Erreur lors de la gestion des sockets:', socketError);
      // On continue même si la gestion des sockets échoue
    }

    // Créer la conversation
    return this.prisma.conversation.create({
      data: {
        participants: {
          create: [{ user_id: userId }, { user_id: receiverId }],
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

  async findConversationContent(conversationId: string, userId: string) {
    this.logger.log(`Début de findConversationContent - Conversation: ${conversationId} - User: ${userId}`);

    // Vérifier que l'utilisateur a accès à la conversation
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        conversation_id: conversationId,
        participants: {
          some: { user_id: userId },
        },
      },
    });

    if (!conversation) {
      this.logger.error(`Conversation non trouvée - Conversation: ${conversationId} - User: ${userId}`);
      throw new NotFoundException(
        'Conversation non trouvée ou accès non autorisé'
      );
    }

    this.logger.log(`Conversation trouvée - Conversation: ${conversationId}`);

    // Récupérer les messages avec les informations de l'expéditeur
    const messages = await this.prisma.message.findMany({
      where: {
        conversation_id: conversationId,
        is_deleted: false,
      },
      include: {
        sender: {
          select: {
            user_id: true,
            username: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        created_at: 'asc',
      },
    });

    this.logger.log(`Messages trouvés: ${messages.length} - Conversation: ${conversationId}`);
    if (messages.length > 0) {
      this.logger.log(`Premier message: ${JSON.stringify(messages[0])}`);
      this.logger.log(`Dernier message: ${JSON.stringify(messages[messages.length - 1])}`);
    }

    // Récupérer les questions-réponses
    const pollAnswerSources = await this.prisma.pollAnswerSource.findMany({
      where: {
        conversation_id: conversationId,
      },
      include: {
        answer: {
          include: {
            poll: {
              include: {
                poll_translations: true,
                options: {
                  include: {
                    translations: true,
                  },
                },
              },
            },
            option: {
              include: {
                translations: true,
              },
            },
          },
        },
      },
    });

    this.logger.log(`Sources de réponses trouvées: ${pollAnswerSources.length} - Conversation: ${conversationId}`);

    // Transformer les questions-réponses en format similaire aux messages
    const pollAnswers = pollAnswerSources.map(source => ({
      type: 'poll_answer',
      created_at: source.answer?.answered_at || new Date(),
      poll: source.answer?.poll,
      answer: source.answer,
      source_type: source.source_type,
    }));

    this.logger.log(`Réponses transformées: ${pollAnswers.length} - Conversation: ${conversationId}`);

    // Fusionner et trier tous les éléments par date
    const allContent = [...messages, ...pollAnswers].sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    this.logger.log(`Contenu total après fusion: ${allContent.length} - Conversation: ${conversationId}`);
    if (allContent.length > 0) {
      this.logger.log(`Premier élément: ${JSON.stringify(allContent[0])}`);
      this.logger.log(`Dernier élément: ${JSON.stringify(allContent[allContent.length - 1])}`);
    }

    return allContent;
  }

  async getConversationLevel(xpPoint: number, difficulty: string) {
    const levels = levelConfig.filter(config => config.difficulty === difficulty);
    const currentXp = xpPoint;
    
    // je veux le dernier niveau qui a un xpRequired inférieur ou égal à currentXp
    const currentLevel = levels.reduce((prev, curr) => {
      return (currentXp >= curr.xp_required) ? curr : prev;
    }, null);
    if (!currentLevel) {
      throw new NotFoundException('Level non trouvé');
    }
    const nextLevel = levels.find(config => config.xp_required > currentXp);
    const levelData = {
      xpPerQuestion: XP_CONFIG.QUESTION_DIFFICULTY[difficulty],
      reachedXP: currentXp,
      reachedLevel: currentLevel.level,
      remainingXpAfterLevelUp: currentXp - currentLevel.xp_required,
      requiredXpForCurrentLevel: currentLevel.xp_required,
      maxXpForNextLevel: nextLevel ? nextLevel.xp_required : 0,
      nextLevel: nextLevel ? nextLevel.level : 0,
      requiredXpForNextLevel: nextLevel ? nextLevel.xp_required - currentXp : 0,
      reward: currentLevel.reward,
      photo_reveal_percent: currentLevel.photo_reveal_percent
    }
    return levelData;
  }

  async updateXpToConversationId(conversationId: string, difficulty: string) {
    if (!conversationId) throw new Error('Conversation not found'); 
   const xpPerQuestion = XP_CONFIG.QUESTION_DIFFICULTY[difficulty];

    // Étape 2 — Ajouter l'XP
    const updatedXp = await this.prisma.conversation.update({
      where: { conversation_id: conversationId },
      data: {
        xp_point: { increment: xpPerQuestion },
      },
    });
    return updatedXp.xp_point
  }
}
