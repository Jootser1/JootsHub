import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    if (!password) throw new Error('Password is required'); // 🔥 Ajoute une vérification
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username: '', // Temporary username, will be updated later
      },
    });
    const username = `Jooster${newUser.userNumber}`;
    return this.prisma.user.update({
      where: { id: newUser.id },
      data: { username },
    });
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    console.log('Login user', user);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { isOnline: true },
    });

    const token = this.jwtService.sign({ userId: user.id });
    return { access_token: token, user };
  }

  async logout(userId: string): Promise<{ message: string }> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { isOnline: false },
    });
    return { message: 'User logged out successfully' };
  }
}
