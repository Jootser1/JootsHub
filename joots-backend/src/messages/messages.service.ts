import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async markAsRead(conversationId: string, userId: string) {
    // Vérifier que l'utilisateur a accès à la conversation
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        id: conversationId,
        participants: {
          some: { userId },
        },
      },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation non trouvée ou accès non autorisé');
    }

    // Marquer tous les messages reçus comme lus
    await this.prisma.message.updateMany({
      where: {
        conversationId,
        senderId: { not: userId }, // Messages envoyés par d'autres utilisateurs
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return { success: true };
  }
}
