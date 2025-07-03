import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async register(email: string, password: string) {
    if (!password) throw new Error('Password is required');
    const hashedPassword = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 5,
      parallelism: 1,
    });

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

      // 2. Récupération des catégories existantes
      const categories = await prisma.category.findMany({
        select: { category_id: true },
      });

      // 3. Insertion des préférences utilisateur pour chaque catégorie
      await prisma.userCategoryPreference.createMany({
        data: categories.map((category) => ({
          user_id: user.user_id,
          category_id: category.category_id,
          enabled: true,
        })),
        skipDuplicates: true,
      });

      //4. Mettre à jour le username avec le numéro d'utilisateur
      const username = `Jootser${user.user_number}`;
      return prisma.user.update({
        where: { user_id: user.user_id },
        data: { username },
      });
    });

    return result;
  }

  async login(email: string, password: string) {
    const auth = await this.prisma.auth.findUnique({
      where: { email },
      include: { user: true },
    });

    if (!auth) {
      console.log('Utilisateur non trouvé');
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await argon2.verify(auth.password, password);
    if (!passwordValid) {
      console.log('Mot de passe invalide');
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log('[AuthService] Mise à jour du statut en ligne');
    await this.prisma.user.update({
      where: { user_id: auth.user_id },
      data: { last_seen: new Date() },
    });

    const payload = {
      sub: auth.user_id,
      email: auth.email,
      username: auth.user.username,
    };

    const access_token = this.jwtService.sign(payload);
    console.log('Access token:', access_token)

    return {
      user: {
        ...auth.user,
        email: auth.email,
      },
      access_token,
    };
  }

  async logout(userId: string) {
    await this.prisma.user.update({
      where: { user_id: userId },
      data: { last_seen: new Date() },
    });
    return { message: 'Logged out successfully' };
  }
}
