import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

// Définir l'interface UserAnswer à l'extérieur de la classe
interface IcebreakerUserAnswer {
  userId: string;
  questionOption: string;
}

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
  
  async addIcebreakerMessage(conversationId: string, questionLabel: string, userAnswerA: IcebreakerUserAnswer, userAnswerB: IcebreakerUserAnswer) {
    // Récupérer les UserAnswer avec leurs relations
    console.log("userAnswerA", userAnswerA);
    console.log("userAnswerB", userAnswerB);

    
    await this.prisma.message.create({
      data: {
        conversationId,
        messageType: 'ANSWER',
        content: questionLabel,
        userAId: userAnswerA.userId,
        userAAnswer: userAnswerA.questionOption,
        userBId: userAnswerB.userId,
        userBAnswer: userAnswerB.questionOption,
      }
    });
    
  }
}