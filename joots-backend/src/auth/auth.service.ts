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
      { email: user.email, username: user.username },
      { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRATION }
    );
    
    const refreshToken = this.jwtService.sign(
      { email: user.email, username: user.username },
      { secret: process.env.JWT_REFRESH_SECRET, expiresIn: process.env.JWT_REFRESH_EXPIRATION }
    );

    return { accessToken, refreshToken };
  }

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

    const tokens = this.generateTokens(user);
    return { 
      access_token: tokens.accessToken, 
      refresh_token: tokens.refreshToken,
      user 
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });
      const user = await this.prisma.user.findUnique({ where: { email: decoded.email } });
      
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const tokens = this.generateTokens(user);
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
}
