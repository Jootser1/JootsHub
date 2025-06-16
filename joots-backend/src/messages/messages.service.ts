import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';




// Définir l'interface UserAnswer à l'extérieur de la classe
interface IcebreakerUserAnswer {
  user_id: string;
  poll_option_id: string;
}

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async markAsRead(conversationId: string, userId: string) {
    // Vérifier que l'utilisateur a accès à la conversation
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        conversation_id: conversationId,
        participants: {
          some: { user_id: userId },
        },
      },
    });

    if (!conversation) {
      throw new NotFoundException(
        'Conversation non trouvée ou accès non autorisé'
      );
    }

    // Marquer tous les messages reçus comme lus
    await this.prisma.message.updateMany({
      where: {
        conversation_id: conversationId,
        sender: { NOT: { user_id: userId } }, // Messages envoyés par d'autres utilisateurs
        is_read: false,
      },
      data: {
        is_read: true,
      },
    });

    return { success: true };
  }

  
}
