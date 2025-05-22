import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserGateway } from '../gateways/user.gateway';
import { UserContactsService } from '../users/contacts/contacts.service';
import { ProgressionResult } from '../types/chat';
import { XP_CONFIG } from 'src/config/leveling';
@Injectable()
export class ConversationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userGateway: UserGateway,
    private readonly userContactsService: UserContactsService,
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
          timestamp: new Date().toISOString()
        };
        
        const statusData2 = {
          userId: user2.id,
          isOnline: user2.isOnline,
          timestamp: new Date().toISOString()
        };

        // Émettre avec un timeout pour éviter les problèmes de connexion
        setTimeout(() => {
          this.userGateway.server.to(room1).emit('userStatusChange', statusData1);
          this.userGateway.server.to(room2).emit('userStatusChange', statusData2);
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
    
    return messages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    
    
  }
  
  async getConversationLevel(conversationId: string) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      select: { id: true, xpPoint: true, difficulty: true },
    });
    
    if (!conversation) {
      throw new NotFoundException('Conversation non trouvée');
    }
    
    const levels = await this.prisma.levelingConfig.findMany({
      where: { difficulty: conversation.difficulty },
      orderBy: { xpRequired: 'asc' },
    });
    
    let currentLevel = 0;
    let nextXp = 0;
    
    for (const level of levels) {
      if (conversation.xpPoint >= level.xpRequired) {
        currentLevel = level.level;
      } else {
        nextXp = level.xpRequired - conversation.xpPoint;
        break;
      }
    }
    
    return {
      level: currentLevel,
      remainingXp: nextXp,
    };
  }
  
  async addXpToConversation(conversationId: string, xp: number) {
    const updated = await this.prisma.conversation.update({
      where: { id: conversationId },
      data: {
        xpPoint: { increment: xp },
      },
    });
    
    return updated;
  }
  
  async addXpAndComputeLevel(conversationId: string): Promise<ProgressionResult> {
    // Étape 1 — Récupérer la conversation
    const conversation = await  this.prisma.conversation.findUnique({
      where: { id: conversationId },
      select: { id: true, xpPoint: true, difficulty: true },
    });
    
    if (!conversation) throw new Error('Conversation not found');
    const difficulty = conversation.difficulty;
    const xpPerQuestion = XP_CONFIG.QUESTION_DIFFICULTY[difficulty];
    
    
    // Étape 2 — Ajouter l'XP
    const updated = await this.addXpToConversation(conversation.id, xpPerQuestion);
    const totalXp = updated.xpPoint;
    
    // Étape 3 — Récupérer la courbe d'XP pour cette difficulté
    const levels = await this.prisma.levelingConfig.findMany({
      where: { difficulty: conversation.difficulty },
      orderBy: { xpRequired: 'asc' },
    });
    
    // Étape 4 — Calcul du niveau actuel
    let currentLevel = 0;
    let reward: string | undefined;
    let photoRevealPercent: number | undefined;
    let nextXp = 0;
    
    for (let i = 0; i < levels.length; i++) {
      const level = levels[i];
      
      if (totalXp >= level.xpRequired) {
        currentLevel = level.level;
        reward = level.reward ?? undefined;
        photoRevealPercent = level.photoRevealPercent ?? undefined;
      } else {
        nextXp = level.xpRequired - totalXp;
        break;
      }
    }
    
    return {
      newXp: totalXp,
      level: currentLevel,
      remainingXp: nextXp,
      reward,
      photoRevealPercent,
    };
  }
  
  
}
