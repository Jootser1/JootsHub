import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany();
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
