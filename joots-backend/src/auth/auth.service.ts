import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'; // 👈 Vérifie bien cet import
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(email: string, password: string, username: string) {
    if (!password) throw new Error('Password is required'); // 🔥 Ajoute une vérification
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: { email, password: hashedPassword, username },
    });
  }
}
