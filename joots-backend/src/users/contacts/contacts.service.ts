// src/services/user-contacts.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Logger } from '@nestjs/common';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class UserContactsService {
  constructor(
    private prisma: PrismaService,
    private logger: Logger,
    private redis: RedisService
  ) {}

  /**
   * Récupère tous les contacts d'un utilisateur
   */
  async getUserContacts(userId: string): Promise<
    {
      contact: {
        user_id: string;
        username: string;
        avatar: string | null;
      };
    }[]
  > {
    const contacts = await this.prisma.userContact.findMany({
      where: { user_id: userId },
      include: {
        contact: {
          select: {
            user_id: true,
            username: true,
            avatar: true,
            last_seen: true,
          },
        },
      },
    });

    this.logger.log(
      `[Contacts Service] ${userId} : ${contacts.length} contacts trouvés`
    );

    return contacts.map((contact) => ({
      contact: {
        user_id: contact.contact.user_id,
        username: contact.contact.username,
        avatar: contact.contact.avatar
            },
    }));
  }

  async getContactsIds(userId: string) {
    try {
      // Récupére la liste des contacts de l'utilisateur et la liste de ceux en ligne
      const contacts = await this.prisma.userContact.findMany({
        where: { user_id: userId },
        select: {
          contact_id: true,
        },
      });

      if (contacts.length === 0) {
        return;
      }

      const contactsIds = contacts.map((contact) => contact.contact_id);
      return contactsIds;
    } catch (error) {
      this.logger.error(
        `[User Socket] ${userId} : Erreur lors de la récupération des contacts: ${error.message}`
      );
      return;
    }
  }

  async isUserContact(userId: string, contactId: string): Promise<boolean> {
    const contact = await this.prisma.userContact.findUnique({
      where: {
        user_id_contact_id: {
          user_id: userId,
          contact_id: contactId,
        },
      },
    });

    return !!contact;
  }

  async getOnlineContactsFromRedis(userId: string, contactsIds: string[]) {
    try {
      // Récupérer la liste des utilisateurs en ligne
      const onlineUsersIds = await this.redis.smembers('online_users');

      // Filtrer pour obtenir les contacts en ligne
      const onlineContactIds = contactsIds.filter((contactId) =>
        onlineUsersIds.includes(contactId)
      );

      if (onlineContactIds.length === 0) {
        return;
      }

      return onlineContactIds;
    } catch (error) {
      this.logger.error(
        `[User Socket] ${userId} : Erreur lors de la récupération des contacts en ligne: ${error.message}`
      );
      return;
    }
  }

  async addUserContactinBDD(userId: string, contactId: string): Promise<void> {
    // Vérifier que l'utilisateur à ajouter existe
    const contactUser = await this.prisma.user.findUnique({
      where: { user_id: contactId },
    });

    if (!contactUser) {
      throw new Error("L'utilisateur à ajouter en contact n'existe pas");
    }

    // Vérifier que ce n'est pas l'utilisateur lui-même
    if (userId === contactId) {
      throw new Error('Vous ne pouvez pas vous ajouter vous-même en contact');
    }

    // Vérifier si le contact existe déjà
    const existingContact = await this.isUserContact(userId, contactId);
    if (existingContact) {
      return; // Déjà un contact, ne rien faire
    }

    // Créer la relation de contact
    await this.prisma.userContact.create({
      data: {
        user_id: userId,
        contact_id: contactId,
      },
    });
  }

  async removeUserContact(userId: string, contactId: string): Promise<void> {
    await this.prisma.userContact.delete({
      where: {
        user_id_contact_id: {
          user_id: userId,
          contact_id: contactId,
        },
      },
    });
  }
}
