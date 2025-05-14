import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserAnswer } from '@prisma/client';

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
  
  
  async addIcebreakerMessage(conversationId: string, questionLabel: string, userAnswerA: UserAnswer, userAnswerB: UserAnswer) {
    // Récupérer les UserAnswer avec leurs relations
    const [answerA, answerB] = await Promise.all([
      this.prisma.userAnswer.findUnique({
        where: { id: userAnswerA.id },
        include: {
          user: true,
          questionOption: true
        }
      }),
      this.prisma.userAnswer.findUnique({
        where: { id: userAnswerB.id },
        include: {
          user: true,
          questionOption: true
        }
      })
    ]);

    if (!answerA || !answerB) {
      throw new NotFoundException('Réponses non trouvées');
    }

    await this.prisma.message.create({
      data: {
        senderId: 'JOOTS',
        conversationId,
        messageType: 'ANSWER',
        content: questionLabel,
        userAId: answerA.user.id,
        userAAnswer: answerA.questionOption.label,
        userBId: answerB.user.id,
        userBAnswer: answerB.questionOption.label,
      }
    });
  }
}