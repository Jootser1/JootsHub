import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AttributeKey } from '@prisma/client';
import { UpdateMyProfileDto } from './dto/update-myprofile.dto';
import levelConfig from '../config/leveling_config_seed.json';
import { AppLogger } from '../logger/logger.service';

@Injectable()
export class MyProfileService {
  private readonly logger = new AppLogger();

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
        photoRevealPercent: levelEntry?.photo_reveal_percent || null
      };
    });
    
    return result;
  }

  async getMyProfile(userId: string) {
    const attributes = await this.prisma.userAttribute.findMany({
      where: { user_id: userId },
    });

    const user = await this.prisma.user.findUnique({
      where: { user_id: userId },
      select: { avatar: true },
    });

    const profile: Record<AttributeKey | 'avatar', string | string[] | null> = {} as any;

    for (const attr of attributes) {
      profile[attr.key] = attr.value.includes('||') ? attr.value.split('||') : attr.value;
    }
    profile.avatar = user?.avatar || null;

    return profile;
  }

  async updateMyProfile(
    userId: string, 
    dto: UpdateMyProfileDto & { avatar?: string }, 
    difficulty: string = 'INTERMEDIATE'
  ) {
    const { avatar, ...attributes } = dto;
    console.log('userId', userId);
    console.log('Mise à jour de mon profil', dto);
    this.logger.log('Mise à jour de mon profil');

    // Update attributs dynamiques avec le bon levelRevealed
    const entries = Object.entries(attributes) as [AttributeKey, any][];
    await Promise.all(
      entries.map(([key, rawValue]) => {
        const value = Array.isArray(rawValue) ? rawValue.join('||') : String(rawValue);
        const levelRevealed = this.getLevelRevealedForAttribute(key, difficulty);
                
        return this.prisma.userAttribute.upsert({
          where: { user_id_key: { user_id: userId, key } },
          update: { value, level_revealed: levelRevealed },
          create: { user_id: userId, key, value, level_revealed: levelRevealed },
        });
      })
    );

    // Update avatar si présent
    if (avatar) {
      await this.prisma.user.update({
        where: { user_id: userId },
        data: { avatar },
      });
    }

    return this.getMyProfile(userId);
  }
}
