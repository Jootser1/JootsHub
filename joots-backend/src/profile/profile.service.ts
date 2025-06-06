import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AttributeKey } from '@prisma/client';
import { UpdateProfileDto } from './dto/update-profile.dto';
import levelConfig from '../config/leveling_config_seed.json';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Détermine le niveau auquel un attribut est révélé selon la configuration de leveling
   * @param attributeKey La clé de l'attribut
   * @param difficulty La difficulté (par défaut INTERMEDIATE)
   * @returns Le niveau auquel l'attribut est révélé
   */
  private getLevelRevealedForAttribute(attributeKey: AttributeKey, difficulty: string = 'INTERMEDIATE'): number {
    // Trouver l'entrée dans la configuration qui correspond à la récompense
    const levelEntry = levelConfig.find(
      config => config.difficulty === difficulty && config.reward === attributeKey
    );
    
    // Si l'attribut n'est pas trouvé dans la config de leveling, retourner 0 (toujours visible)
    return levelEntry ? levelEntry.level : 0;
  }

  /**
   * Obtient les informations de niveau de révélation pour tous les attributs
   * @param difficulty La difficulté pour laquelle calculer les niveaux
   * @returns Un objet avec les niveaux de révélation par attribut
   */
  getAttributeLevelInfo(difficulty: string = 'INTERMEDIATE'): Record<AttributeKey, { levelRevealed: number; photoRevealPercent?: number | null }> {
    const result = {} as Record<AttributeKey, { levelRevealed: number; photoRevealPercent?: number | null }>;
    
    // Pour chaque attribut possible
    Object.values(AttributeKey).forEach(attributeKey => {
      const levelEntry = levelConfig.find(
        config => config.difficulty === difficulty && config.reward === attributeKey
      );
      
      result[attributeKey] = {
        levelRevealed: levelEntry ? levelEntry.level : 0,
        photoRevealPercent: levelEntry?.photoRevealPercent || null
      };
    });
    
    return result;
  }

  async getUserProfile(userId: string) {
    const attributes = await this.prisma.userAttribute.findMany({
      where: { userId },
    });

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { avatar: true },
    });

    const profile: Record<AttributeKey | 'avatar', string | string[] | null> = {} as any;

    for (const attr of attributes) {
      profile[attr.key] = attr.value.includes('||') ? attr.value.split('||') : attr.value;
    }
    profile.avatar = user?.avatar || null;

    return profile;
  }

  async updateUserProfile(
    userId: string, 
    dto: UpdateProfileDto & { avatar?: string }, 
    difficulty: string = 'INTERMEDIATE'
  ) {
    const { avatar, ...attributes } = dto;
    console.log('Mise à jour du profil utilisateur', { userId, difficulty });

    // Update attributs dynamiques avec le bon levelRevealed
    const entries = Object.entries(attributes) as [AttributeKey, any][];
    await Promise.all(
      entries.map(([key, rawValue]) => {
        const value = Array.isArray(rawValue) ? rawValue.join('||') : String(rawValue);
        const levelRevealed = this.getLevelRevealedForAttribute(key, difficulty);
                
        return this.prisma.userAttribute.upsert({
          where: { userId_key: { userId, key } },
          update: { value, levelRevealed },
          create: { userId, key, value, levelRevealed },
        });
      })
    );

    // Update avatar si présent
    if (avatar) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { avatar },
      });
    }

    return this.getUserProfile(userId);
  }
}
