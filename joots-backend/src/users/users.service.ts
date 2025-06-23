import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { AppLogger } from '../logger/logger.service';
import { Socket } from 'socket.io';
import { AttributeKey } from '@prisma/client';
import levelConfig from '../config/leveling_config_seed.json';
import { UserWithAuth } from '@shared/user.types';

// Définir notre propre type User avec Auth sans dépendre des types Prisma


@Injectable()
export class UsersService {
  private readonly logger = new AppLogger();

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService
  ) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<UserWithAuth> {
    const user = await this.prisma.user.findUnique({
      where: { user_id: id },
      select: {
        user_id: true,
        avatar: true,
        created_at: true,
        updated_at: true,
        user_number: true,
        username: true,
        role: true,
        last_seen: true,
        auth: {
          select: {
            auth_id: true,
            email: true,
            password: true,
            access_token: true,
            refresh_token: true,
            created_at: true,
            updated_at: true,
            user_id: true,
          },
        },
      },
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

  async updateChatPreference(userId: string, isAvailableForChat: boolean) {
    const user = await this.prisma.userSettings.update({
      where: { user_id: userId },
      data: { is_available_for_chat: isAvailableForChat },
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
            user_id: currentUserId,
          },
        },
      },
      include: {
        participants: {
          select: {
            user_id: true,
          },
        },
      },
    });


    
    // Créer un Set des IDs des utilisateurs avec qui nous avons déjà parlé
    const existingUserIds = new Set(
      existingConversations.flatMap((conv) =>
        conv.participants.map((p: { user_id: string }) => p.user_id)
      )
    );

    // On ne vérifie plus si les utilisateurs sont en ligne, on prend les derniers utilisateurs connectés
    const availableUsers = await this.prisma.user.findMany({
      where: {
        AND: [
          { user_settings: { is_available_for_chat: true } },
          { user_id: { not: currentUserId } }, // Exclure l'utilisateur actuel
          { user_id: { notIn: Array.from(existingUserIds) } }, // Exclure les utilisateurs avec qui nous avons déjà parlé
        ],
      },
      select: {
        user_id: true,
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


  async getUserProfileForConversation(userId: string, conversationId: string, requesterId: string) {
    
    // Vérifier que l'utilisateur qui fait la demande fait partie de la conversation
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        conversation_id: conversationId,
        participants: {
          some: { user_id: requesterId }
        }
      },
      select: {
        conversation_id: true,
        xp_point: true,
        difficulty: true,
        participants: {
          where: { user_id: userId },
          include: {
            user: {
              select: {
                user_id: true,
                username: true,
                avatar: true,
                last_seen: true,
                created_at: true
              }
            }
          }
        }
      }
    });


    if (!conversation) {
      throw new NotFoundException('Conversation non trouvée ou accès non autorisé');
    }

    const targetParticipant = conversation.participants[0];
    if (!targetParticipant) {
      throw new NotFoundException('Utilisateur non trouvé dans cette conversation');
    }

    // Calculer le niveau actuel de la conversation
    const currentLevel = this.getConversationLevel(conversation.xp_point, conversation.difficulty.toString());

    // Récupérer tous les attributs de l'utilisateur
    const userAttributes = await this.prisma.userAttribute.findMany({
      where: { user_id: userId }
    });

    // Filtrer les attributs selon le niveau atteint
    const revealedAttributes: Record<string, any> = {};
    
    for (const attribute of userAttributes) {
      if (attribute.level_revealed <= currentLevel) {
        revealedAttributes[attribute.key] = attribute.value.includes('||') 
          ? attribute.value.split('||') 
          : attribute.value;
      }
    }


    // Calculer le pourcentage de révélation de la photo
    const levelData = levelConfig.find(
      config => config.difficulty === conversation.difficulty.toString() && config.level === currentLevel
    );
    const photoRevealPercent = levelData?.photo_reveal_percent || 0;

    const result = {
      user: {
        user_id: targetParticipant.user.user_id,
        username: targetParticipant.user.username,
        avatar: targetParticipant.user.avatar,
        last_seen: targetParticipant.user.last_seen,
        created_at: targetParticipant.user.created_at
      },
      revealedAttributes,
      conversationLevel: currentLevel,
      photoRevealPercent,
      totalAttributes: Object.values(AttributeKey).length,
      revealedCount: Object.keys(revealedAttributes).length
    };

    return result;
  }

  private getConversationLevel(xp_point: number, difficulty: string): number {
    const levels = levelConfig.filter(config => config.difficulty === difficulty);
    const currentLevel = levels.reduce((prev, curr) => {
      return (xp_point >= curr.xp_required) ? curr : prev;
    }, levels[0]);
    
    return currentLevel ? currentLevel.level : 1;
  }
}
