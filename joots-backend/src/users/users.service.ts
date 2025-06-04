import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { RedisService } from '../redis/redis.service';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { AttributeKey } from '@prisma/client';
import levelConfig from '../config/leveling_config_seed.json';

// Définir notre propre type User avec Auth sans dépendre des types Prisma
type UserWithAuth = {
  id: string;
  avatar: string | null;
  bio: string | null;
  languages: string[];
  createdAt: Date;
  updatedAt: Date;
  userNumber: number;
  username: string;
  role: string;
  isOnline: boolean;
  isAvailableForChat: boolean;
  // Auth relation
  auth: {
    id: string;
    email: string;
    password: string;
    accessToken: string | null;
    refreshToken: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
  } | null;
};

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly logger: Logger
  ) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<UserWithAuth> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { auth: true },
    });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    return user as UserWithAuth;
  }

  async getUsersCount() {
    return this.prisma.user.count();
  }

  async addUserInRedisOnlineUsers(client: Socket, userId: string) {
    await this.redis.sadd('online_users', userId);
    await this.redis.set(`user:${userId}:last_seen`, Date.now().toString());
    this.logger.log(
      `[User Socket ${client.id}] ${userId} : Utilisateur connecté`
    );
  }

  async removeUserInRedisOnlineUsers(client: Socket, userId: string) {
    await this.redis.srem('online_users', userId);
    await this.redis.set(`user:${userId}:last_seen`, Date.now().toString());
    this.logger.log(
      `[User Socket ${client.id}] ${userId} : Utilisateur déconnecté`
    );
  }

  async getOnlineUsers() {
    return this.prisma.user.findMany({
      where: { isOnline: true },
      select: { id: true, username: true },
    });
  }

  async updateChatPreference(userId: string, isAvailableForChat: boolean) {
    const user = await this.prisma.userSettings.update({
      where: { userId },
      data: { isAvailableForChat },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    return user;
  }

  async getRandomAvailableUser(currentUserId: string) {
    // Récupérer les IDs des utilisateurs avec qui nous avons déjà une conversation
    const existingConversations = await this.prisma.conversation.findMany({
      where: {
        participants: {
          some: {
            userId: currentUserId,
          },
        },
      },
      include: {
        participants: {
          select: {
            userId: true,
          },
        },
      },
    });

    // Créer un Set des IDs des utilisateurs avec qui nous avons déjà parlé
    const existingUserIds = new Set(
      existingConversations.flatMap((conv) =>
        conv.participants.map((p: { userId: string }) => p.userId)
      )
    );

    const availableUsers = await this.prisma.user.findMany({
      where: {
        AND: [
          { isOnline: true },
          { UserSettings: { isAvailableForChat: true } },
          { id: { not: currentUserId } }, // Exclure l'utilisateur actuel
          { id: { notIn: Array.from(existingUserIds) } }, // Exclure les utilisateurs avec qui nous avons déjà parlé
        ],
      },
      select: {
        id: true,
        username: true,
        avatar: true,
      },
    });

    if (availableUsers.length === 0) {
      throw new NotFoundException('Aucun utilisateur disponible pour le chat');
    }

    // Sélectionner un utilisateur aléatoire
    const randomIndex = Math.floor(Math.random() * availableUsers.length);
    return availableUsers[randomIndex];
  }

  async updateUserStatusinBDD(userId: string, isOnline: boolean) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { isOnline },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    return { id: user.id, isOnline: user.isOnline };
  }

  async getUserProfileForConversation(userId: string, conversationId: string, requesterId: string) {
    console.log(`[getUserProfileForConversation] userId: ${userId}, conversationId: ${conversationId}, requesterId: ${requesterId}`);
    
    // Vérifier que l'utilisateur qui fait la demande fait partie de la conversation
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        id: conversationId,
        participants: {
          some: { userId: requesterId }
        }
      },
      select: {
        id: true,
        xpPoint: true,
        difficulty: true,
        participants: {
          where: { userId },
          include: {
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
                isOnline: true,
                createdAt: true
              }
            }
          }
        }
      }
    });

    console.log(`[getUserProfileForConversation] Conversation found:`, conversation);

    if (!conversation) {
      throw new NotFoundException('Conversation non trouvée ou accès non autorisé');
    }

    const targetParticipant = conversation.participants[0];
    if (!targetParticipant) {
      throw new NotFoundException('Utilisateur non trouvé dans cette conversation');
    }

    console.log(`[getUserProfileForConversation] Target participant:`, targetParticipant);

    // Calculer le niveau actuel de la conversation
    const currentLevel = this.getConversationLevel(conversation.xpPoint, conversation.difficulty.toString());

    console.log(`[getUserProfileForConversation] Current level: ${currentLevel}`);

    // Récupérer tous les attributs de l'utilisateur
    const userAttributes = await this.prisma.userAttribute.findMany({
      where: { userId }
    });

    console.log(`[getUserProfileForConversation] User attributes:`, userAttributes);

    // Filtrer les attributs selon le niveau atteint
    const revealedAttributes: Record<string, any> = {};
    
    for (const attribute of userAttributes) {
      if (attribute.levelRevealed <= currentLevel) {
        revealedAttributes[attribute.key] = attribute.value.includes('||') 
          ? attribute.value.split('||') 
          : attribute.value;
      }
    }

    console.log(`[getUserProfileForConversation] Revealed attributes:`, revealedAttributes);

    // Calculer le pourcentage de révélation de la photo
    const levelData = levelConfig.find(
      config => config.difficulty === conversation.difficulty.toString() && config.level === currentLevel
    );
    const photoRevealPercent = levelData?.photoRevealPercent || 0;

    const result = {
      user: {
        id: targetParticipant.user.id,
        username: targetParticipant.user.username,
        avatar: targetParticipant.user.avatar,
        isOnline: targetParticipant.user.isOnline,
        createdAt: targetParticipant.user.createdAt
      },
      revealedAttributes,
      conversationLevel: currentLevel,
      photoRevealPercent,
      totalAttributes: Object.values(AttributeKey).length,
      revealedCount: Object.keys(revealedAttributes).length
    };

    console.log(`[getUserProfileForConversation] Final result:`, result);
    return result;
  }

  private getConversationLevel(xpPoint: number, difficulty: string): number {
    const levels = levelConfig.filter(config => config.difficulty === difficulty);
    const currentLevel = levels.reduce((prev, curr) => {
      return (xpPoint >= curr.xpRequired) ? curr : prev;
    }, levels[0]);
    
    return currentLevel ? currentLevel.level : 1;
  }
}
