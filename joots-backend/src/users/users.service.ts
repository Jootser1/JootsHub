import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';


type UserWithAuth = Prisma.UserGetPayload<{ include: { auth: true } }>

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<UserWithAuth> {
    const user = await this.prisma.user.findUnique({ 
      where: { id },
      include: { auth: true }
  });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    return user as UserWithAuth;
  }

  async getUsersCount() {
    return this.prisma.user.count();
  }

  async getOnlineUsers() {
    return this.prisma.user.findMany({
      where: { isOnline: true },
      select: { id: true, username: true },
    });
  }

  async updateChatPreference(userId: string, isAvailableForChat: boolean) {
    const user = await this.prisma.user.update({
      where: { id: userId },
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
            userId: currentUserId
          }
        }
      },
      include: {
        participants: {
          select: {
            userId: true
          }
        }
      }
    });
  
    // Créer un Set des IDs des utilisateurs avec qui nous avons déjà parlé
    const existingUserIds = new Set(
      existingConversations.flatMap(conv => 
        conv.participants.map(p => p.userId)
      )
    );
  
    const availableUsers = await this.prisma.user.findMany({
      where: {
        AND: [
          { isOnline: true },
          { isAvailableForChat: true },
          { id: { not: currentUserId } }, // Exclure l'utilisateur actuel
          { id: { notIn: Array.from(existingUserIds) } } // Exclure les utilisateurs avec qui nous avons déjà parlé
        ]
      },
      select: {
        id: true,
        username: true,
        avatar: true
      }
    });
  
    if (availableUsers.length === 0) {
      throw new NotFoundException('Aucun utilisateur disponible pour le chat');
    }
  
    // Sélectionner un utilisateur aléatoire
    const randomIndex = Math.floor(Math.random() * availableUsers.length);
    return availableUsers[randomIndex];
  }

  async updateUserStatus(userId: string, isOnline: boolean) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: { isOnline },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    return { id: user.id, isOnline: user.isOnline };
  }
}
