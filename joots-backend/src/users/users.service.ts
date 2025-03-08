import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '@prisma/client'; // Modèle User

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
  }

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    return user;
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
}
