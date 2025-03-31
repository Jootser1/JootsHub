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

    return result;
  }

  async login(email: string, password: string) {
    console.log('Recherche de l\'utilisateur avec l\'email:', email);
    const auth = await this.prisma.auth.findUnique({
      where: { email },
      include: { user: true },
    });

    if (!auth) {
      console.log('Utilisateur non trouvé');
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log('Vérification du mot de passe');
    const passwordValid = await bcrypt.compare(password, auth.password);
    if (!passwordValid) {
      console.log('Mot de passe invalide');
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log('Mise à jour du statut en ligne');
    await this.prisma.user.update({
      where: { id: auth.userId },
      data: { isOnline: true },
    });

    const payload = { 
      sub: auth.userId,
      email: auth.email,
      username: auth.user.username
    };

    const access_token = this.jwtService.sign(payload);

    return { 
      user: {
        ...auth.user,
        email: auth.email
      },
      access_token
    };
  }

  async logout(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { isOnline: false },
    });
    return { message: 'Logged out successfully' };
  }
}
