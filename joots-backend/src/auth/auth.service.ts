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

  private generateTokens(user: any) {
    const accessToken = this.jwtService.sign(
      { userId: user.id, username: user.username },
      { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRATION }
    );
    
    const refreshToken = this.jwtService.sign(
      { userId: user.id, username: user.username },
      { secret: process.env.JWT_REFRESH_SECRET, expiresIn: process.env.JWT_REFRESH_EXPIRATION }
    );

    return { accessToken, refreshToken };
  }

  async register(email: string, password: string) {
    if (!password) throw new Error('Password is required');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur et l'authentification en une seule transaction
    const result = await this.prisma.$transaction(async (prisma) => {
      // Créer l'utilisateur avec un username temporaire
      const user = await prisma.user.create({
        data: {
          username: '', // Sera mis à jour après
          auth: {
            create: {
              email,
              password: hashedPassword,
            },
          },
        },
      });

      // Mettre à jour le username avec le numéro d'utilisateur
      const username = `Jooster${user.userNumber}`;
      return prisma.user.update({
        where: { id: user.id },
        data: { username },
      });
    });

    const tokens = this.generateTokens(result);
    await this.updateTokens(result.id, tokens);

    return result;
  }

  async login(email: string, password: string) {
    console.log(this.prisma)
    const auth = await this.prisma.auth.findUnique({
      where: { email },
      include: { user: true },
    });

    if (!auth) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(password, auth.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.prisma.user.update({
      where: { id: auth.userId },
      data: { isOnline: true },
    });

    const tokens = this.generateTokens(auth.user);
    await this.updateTokens(auth.userId, tokens);

    return { 
      access_token: tokens.accessToken, 
      refresh_token: tokens.refreshToken,
      user: {
        ...auth.user,
        email: auth.email
      }
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });
      const auth = await this.prisma.auth.findUnique({
        where: { userId: decoded.userId },
        include: { user: true },
      });
      
      if (!auth) {
        throw new UnauthorizedException('User not found');
      }

      const tokens = this.generateTokens(auth.user);
      await this.updateTokens(auth.userId, tokens);

      return { 
        access_token: tokens.accessToken, 
        refresh_token: tokens.refreshToken 
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string): Promise<{ message: string }> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { isOnline: false },
    });
    return { message: 'User logged out successfully' };
  }

  private async updateTokens(userId: string, tokens: { accessToken: string; refreshToken: string }) {
    await this.prisma.auth.update({
      where: { userId },
      data: { 
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    });
  }
}
