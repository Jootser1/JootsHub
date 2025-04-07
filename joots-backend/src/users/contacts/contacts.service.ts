// src/services/user-contacts.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { ConversationParticipant } from '../../../types/chat';

@Injectable()
export class UserContactsService {
  constructor(private prisma: PrismaService) {}

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

    return contacts.map(contact => ({
      contact: {
        id: contact.contact.id,
        username: contact.contact.username,
        avatar: contact.contact.avatar,
        isOnline: contact.contact.isOnline
      }
    }));
  }

  /**
   * Vérifie si un utilisateur est dans les contacts
   */
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

  /**
   * Ajoute un utilisateur aux contacts
   */
  async addUserContact(userId: string, contactId: string): Promise<void> {
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

  /**
   * Supprime un utilisateur des contacts
   */
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
}