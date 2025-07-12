import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserGateway } from '../gateways/user.gateway';
import { UserContactsService } from '../users/contacts/contacts.service';
import { XP_CONFIG } from 'src/config/points_per_difficulty';
import levelConfig from '../config/leveling_config_seed.json';
import { AppLogger } from '../logger/logger.service';
import { Conversation, ConversationWithPollAndXp, ConversationWithXpAndLevel, xp_and_level, PollAnswerSourceWithAnswer, RawAnswer, GroupedResult } from '@shared/conversation.types';
import { UsersService } from 'src/users/users.service'; 
import { ChatStoreMessage, MessageStatus, MessageType } from '@shared/message.types';

@Injectable()
export class ConversationsService {
  private readonly logger = new AppLogger();
  
  constructor(
    private readonly prisma: PrismaService,
    private readonly userGateway: UserGateway,
    private readonly userContactsService: UserContactsService,
    private readonly usersService: UsersService
  ) {}
  
  private readonly userSelect = {
    user_id: true,
    username: true,
    avatar: true,
    last_seen: true,
  };
  
  
  async findAllConversationsWithPollandXpForAUserId(userId: string): Promise<any[]> {
    try {
      
      const conversationsIds = await this.findAllConversationsIdsForAUserId(userId);
      
      if (conversationsIds.length === 0) {
        return []; // Retourner un tableau vide au lieu de lancer une exception
      } 
      
      const conversations: any[] = [];
      
      for (const conversationId of conversationsIds) {
        const conversation = await this.fetchConversationWithMessagesAndCurrentPoll(conversationId, userId);

        if (!conversation) {
          throw new NotFoundException('Conversation non trouvée');
        }

        const pollAnswerForConversation = await this.getPollAnswerSourcesForConversation(conversation);
        
        const chatPollAnswers = pollAnswerForConversation.length > 0 
        ? await this.integratePollAnswersIntoChatMessages(pollAnswerForConversation as any, conversation.participants[0].user_id)
        : [];
        
        // Fusionner et trier tous les éléments par date
        const allContent = [...conversation.messages, ...chatPollAnswers].sort(
          (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
        
        conversation.messages = allContent;
        
        const xp_and_level = await this.getConversationLevel(conversation.xp_point, conversation.difficulty)
        
        conversations.push({...conversation, xp_and_level});
      }
      
      return conversations;
      
      
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
  
  async fetchOnlyConversationById(id: string, userId?: string) : Promise<Conversation> {
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        conversation_id: id,
      },
      include: {
        participants: {
          select: {
            user_id: true,
            conversation_id: true,
            user: true,
            is_icebreaker_ready: true,
          },
        },
        messages: {
          select: {
            message_id: true,
            content: true,
            created_at: true,
            sender_id: true,
            status: true,
          },
        },
      },
    });
    
    if (!conversation) {
      throw new NotFoundException('Conversation non trouvée');
    }
    return conversation;
  }
  
  async fetchConversationByIdWithXpAndLevel(id: string, userId?: string) : Promise<ConversationWithXpAndLevel> {
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
        created_at: true,
        updated_at: true,
        locale: true,
        participants: {
          include: {
            user: { select: this.userSelect },
          },
        },
        messages: {
          orderBy: { created_at: 'asc' },
          select: {
            message_id: true,
            content: true,
            created_at: true,
            sender_id: true,
            status: true,
          },
        },
      },
    });
    
    
    if (!conversation) {
      throw new NotFoundException('Conversation non trouvée');
    }
    
    const xp_and_level = await this.getConversationLevel(conversation.xp_point, conversation.difficulty);
    
    return {
      ...conversation,
      xp_and_level
    };
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
  
  async createConversation(userId: string, receiverId: string) {
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
  
  private async getPollAnswerSourcesForConversation(conversation: any): Promise<PollAnswerSourceWithAnswer[]> {
    const sources = await this.prisma.pollAnswerSource.findMany({
      where: {
        conversation_id: conversation.conversation_id,
        locale: conversation.locale as any,
      },
      select: {
        locale: true,
        answer: {
          select: {
            user_id: true,
            answered_at: true,
            poll_id: true,
            opentext: true,
            numeric: true,
            option: {
              select: {
                translations: {
                  where: {
                    locale: conversation.locale as any,
                  },
                  select: {
                    translated_option_text: true,
                  },
                },
              },
            },
            poll: {
              select: {
                type: true,
                poll_translations: {
                  where: {
                    locale: conversation.locale as any,
                  },
                },
              },
              
            },
            
          },
        },
      },
    });
    
    
    
    return sources as PollAnswerSourceWithAnswer[];
  }
  
  async getConversationLevel(xpPoint: number, difficulty: string) : Promise<xp_and_level> {
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
      difficulty: difficulty,
      xp_per_question: XP_CONFIG.QUESTION_DIFFICULTY[difficulty],
      reached_xp: currentXp,
      reached_level: currentLevel.level,
      remaining_xp_after_level_up: currentXp - currentLevel.xp_required,
      required_xp_for_current_level: currentLevel.xp_required,
      required_xp_for_next_level: nextLevel ? nextLevel.xp_required - currentXp : 0,
      max_xp_for_next_level: nextLevel ? nextLevel.xp_required : 0,
      next_level: nextLevel ? nextLevel.level : 0,
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
  
  async startRandomConversation(userId: string) {
    
    const randomUser = await this.usersService.getRandomAvailableUser(userId);
    if (!randomUser) {
      throw new NotFoundException('Aucun utilisateur disponible pour le moment. Revenez plus tard !');
    }
    const conversation = await this.createConversation(userId, randomUser.user_id);
    return conversation
  }
  
  async fetchConversationWithMessagesAndCurrentPoll(conversationId: string, userId: string) {
    return await this.prisma.conversation.findFirst({
      where: {
        conversation_id: conversationId,
        participants: {
          some: { user_id: userId },
        },
      },
      select: {
        conversation_id: true,
        xp_point: true,
        difficulty: true,
        created_at: true,
        locale: true,
        updated_at: true,
        participants: {
          select: {
            conversation_id: true,
            user_id: true,
            user: {
              select: this.userSelect,
            },
            is_icebreaker_ready: true,
          },
        },
        messages: {
          where: {
            status: { not: 'DELETED' },
          },
          orderBy: { created_at: 'desc' },
          select: {
            message_id: true,
            content: true,
            created_at: true,
            sender_id: true,
            status: true,
          },
        },
        current_poll: {
          select: {
            poll_id: true,
            type: true,
            author_id: true,
            created_at: true,
            is_moderated: true,
            is_pinned: true,
            is_enabled: true,
            poll_translations: {
              select: {
                poll_translation_id: true,
                poll_id: true,
                locale: true,
                translation: true,
              },
            },
            categories: {
              select: {
                category: {
                  select: {
                    category_id: true,
                    name: true,
                  },
                },
              },
            },
            options: {
              select: {
                poll_option_id: true,
                order: true,
                translations: {
                  select: {
                    locale: true,
                    translated_option_text: true,
                  },
                },
              },
            },
            scale_constraint: {
              select: {
                is_labeled: true,
                min_value: true,
                max_value: true,
                step_value: true,
                min_label: true,
                max_label: true,
                mid_label: true,
              },
            },
          },
        },
      },
      orderBy: { updated_at: 'desc' },
    });
  }
  
  async integratePollAnswersIntoChatMessages(
    data: RawAnswer[],
    currentUserId: string
  ): Promise<ChatStoreMessage[]> {
    const map = new Map<string, {
      poll_id: string;
      question: string;
      answers: { user_id: string; answer: string; answered_at: string }[];
    }>();
    
    for (const item of data) {
      const answer = item.answer as any; // Cast temporaire pour accéder aux propriétés
      const { poll_id, answered_at, user_id } = answer;
      const question = answer.poll.poll_translations[0].translation;
      
      // Déterminer le texte de la réponse selon le type de sondage
      let answerText: string;
      if (answer.opentext) {
        // Pour les sondages de type OPEN
        answerText = answer.opentext;
      } else if (answer.numeric !== null && answer.numeric !== undefined) {
        // Pour les sondages de type CONTINUOUS
        answerText = answer.numeric.toString();
      } else if (answer.option && answer.option.translations && answer.option.translations.length > 0) {
        // Pour les sondages avec options (MULTIPLE_CHOICE, STEP_LABELED, YES_NO_IDK)
        answerText = answer.option.translations[0].translated_option_text;
      } else {
        // Fallback si aucune réponse n'est trouvée
        answerText = 'Réponse non disponible';
      }
      
      if (!map.has(poll_id)) {
        map.set(poll_id, {
          poll_id,
          question,
          answers: [{ user_id, answer: answerText, answered_at }]
        });
      } else {
        map.get(poll_id)!.answers.push({ user_id, answer: answerText, answered_at });
      }
    }
    
    return Array.from(map.values()).map(group => {
      const a = group.answers.find(ans => ans.user_id === currentUserId);
      const b = group.answers.find(ans => ans.user_id !== currentUserId);
      
      const created_at = new Date(
        Math.max(...group.answers.map(a => new Date(a.answered_at).getTime()))
      );
      
      return {
        message_id: group.poll_id,
        message_type: 'ICEBREAKER' as MessageType,
        sender_id: 'JOOTS',
        content: group.question,
        userAId: a?.user_id,
        userAAnswer: a?.answer,
        userBId: b?.user_id,
        userBAnswer: b?.answer,
        created_at,
        status: 'DELIVERED' as MessageStatus,
      };
    });
  }
}
