// src/services/user-contacts.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
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
  async getUserContacts(userId: string): Promise<{ contact: { id: string; username: string; avatar: string | null; isOnline: boolean } }[]> {
    const contacts = await this.prisma.userContact.findMany({
      where: { userId },
      include: {
        contact: {
          select: {
            id: true,
            username: true,
            avatar: true,
            isOnline: true
          }
        }
      }
    });

    console.log(`[Contacts Service] ${userId} : ${contacts.length} contacts trouvés`);

    // Si contacts est vide, tentons de vérifier si l'utilisateur existe au moins
    if (contacts.length === 0) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId }
      });
      console.log(`L'utilisateur ${userId} existe-t-il?`, !!user);
    }

    return contacts.map(contact => ({
      contact: {
        id: contact.contact.id,
        username: contact.contact.username,
        avatar: contact.contact.avatar,
        isOnline: contact.contact.isOnline
      }
    }));
  }

  async getContactsIds(userId: string) {
    try {
      
      // Récupére la liste des contacts de l'utilisateur et la liste de ceux en ligne
      const contacts = await this.prisma.userContact.findMany({
        where: { userId: userId },
        select: { 
          contactId: true
        }
      });

      if (contacts.length === 0) {
        return;
      }

      const contactsIds = contacts.map(contact => contact.contactId);
      return contactsIds;
    } catch (error) {
      this.logger.error(`[User Socket] ${userId} : Erreur lors de la récupération des contacts: ${error.message}`);
      return;
    }
  }

  async isUserContact(userId: string, contactId: string): Promise<boolean> {
    const contact = await this.prisma.userContact.findUnique({
      where: {
        userId_contactId: {
          userId,
          contactId
        }
      }
    });
    
    return !!contact;
  }

  async getOnlineContactsFromRedis(userId: string, contactsIds: string[]) {
    try {
      // Récupérer la liste des utilisateurs en ligne
      const onlineUsersIds = await this.redis.smembers('online_users');
      
      // Filtrer pour obtenir les contacts en ligne
      const onlineContactIds = contactsIds
      .filter(contactId => onlineUsersIds.includes(contactId));
      
      if (onlineContactIds.length === 0) {
        return;
      }

      return onlineContactIds;

    } catch (error) {
      this.logger.error(`[User Socket] ${userId} : Erreur lors de la récupération des contacts en ligne: ${error.message}`);
      return;
    }  
  }

  async addUserContactinBDD(userId: string, contactId: string): Promise<void> {
    // Vérifier que l'utilisateur à ajouter existe
    const contactUser = await this.prisma.user.findUnique({
      where: { id: contactId }
    });

    if (!contactUser) {
      throw new Error('L\'utilisateur à ajouter en contact n\'existe pas');
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
        userId,
        contactId
      }
    });
  }

  async removeUserContact(userId: string, contactId: string): Promise<void> {
    await this.prisma.userContact.delete({
      where: {
        userId_contactId: {
          userId,
          contactId
        }
      }
    });
  }

  async addUserToAContactRoom(userId: string, contactId: string): Promise<void> {
    
  }
}