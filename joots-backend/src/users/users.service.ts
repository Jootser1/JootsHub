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
}
