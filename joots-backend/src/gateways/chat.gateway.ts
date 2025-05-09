import {
  WebSocketGateway,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseGateway } from './base.gateway';
import { RedisService } from '../redis/redis.service';
import { QuestionService } from '../questions/question.service';
import { IcebreakerService } from '../icebreakers/icebreaker.service';

@WebSocketGateway({
  cors: {
    origin: process.env.NODE_ENV === 'production' 
    ? 'https://joots.app' 
    : 'http://localhost:3000',
    credentials: true
  },
  namespace: 'chat'
})

export class ChatGateway extends BaseGateway {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly questionService: QuestionService,
    private readonly icebreakerService: IcebreakerService
  ) {
    super(ChatGateway.name);
  }
  
  handleConnection(client: Socket) {
    const userId = client.data.userId;
    
    if (!userId) {
      this.logger.warn(`Connexion chat rejetée sans ID utilisateur: ${client.id}`);
      client.disconnect();
      return;
    }
    
    this.logger.log(`Client chat connecté: ${client.id} (${userId})`);

    // Rejoindre automatiquement toutes les conversations de l'utilisateur
    this.joinUserConversations(client, userId).catch(error => {
      this.logger.error(`Erreur lors de la jointure des conversations: ${error.message}`);
    });
  }
  
  handleDisconnect(client: Socket) {
    this.logger.log(`Client chat déconnecté: ${client.id}`);
  }
  
  @SubscribeMessage('joinConversation')
  handleJoinConversation(
    @ConnectedSocket() client: Socket,
    @MessageBody() conversationId: string
  ) {
    try {
      client.join(conversationId);
      this.logger.debug(`Client ${client.id} a rejoint la conversation ${conversationId}`);
      return { success: true };
    } catch (error) {
      this.logger.error(`Erreur lors de la jonction à la conversation ${conversationId}:`, error);
      return { success: false, error: error.message };
    }
  }
  
  @SubscribeMessage('leaveConversation')
  handleLeaveConversation(
    @ConnectedSocket() client: Socket,
    @MessageBody() conversationId: string
  ) {
    try {
      client.leave(conversationId);
      this.logger.debug(`Client ${client.id} a quitté la conversation ${conversationId}`);
      return { success: true };
    } catch (error) {
      this.logger.error(`Erreur lors du départ de la conversation ${conversationId}:`, error);
      return { success: false, error: error.message };
    }
  }
  
  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversationId: string; content: string; userId: string }
  ) {
    const { conversationId, content, userId } = data;
    
    // Vérifier que l'utilisateur est bien celui authentifié
    if (userId !== client.data.userId) {
      return { success: false, error: 'Non autorisé' };
    }
    
    try {
      // Vérifier si la conversation existe
      const conversation = await this.prisma.conversation.findUnique({
        where: { id: conversationId }
      });
      
      if (!conversation) {
        return { success: false, error: 'Conversation non trouvée' };
      }
      
      const message = await this.prisma.message.create({
        data: {
          content,
          sender: { connect: { id: userId } },
          conversation: { connect: { id: conversationId } }
        },
        include: {
          sender: {
            select: { id: true, username: true, avatar: true }
          }
        }
      });
      
      // Sauvegarder le message dans Redis
      try {
        await this.redis.hset(
          `conversation:${conversationId}:messages`,
          message.id,
          JSON.stringify({
            ...message,
            conversationId,
            createdAt: message.createdAt || new Date().toISOString()
          })
        );
      } catch (redisError) {
        // Log l'erreur Redis mais continue (non bloquant)
        this.logger.error(`Erreur Redis: ${redisError.message}`);
      }
      
      // Préparer le message à émettre
      const messageToEmit = {
        ...message,
        conversationId,
        createdAt: message.createdAt || new Date().toISOString()
      };
      
      // Émettre l'événement à tous les clients dans la conversation
      client.join(conversationId); // S'assurer que l'émetteur est dans la salle
      this.server.to(conversationId).emit('newMessage', messageToEmit);
      
      return { success: true, message: messageToEmit };
    } catch (error) {
      this.logger.error(`Erreur lors de l'envoi du message: ${error.message}`);
      return { success: false, error: error.message };
    }
  }
  
  @SubscribeMessage('typing')
  handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversationId: string; userId: string; isTyping: boolean }
  ) {
    const { conversationId, userId, isTyping } = data;
    // Vérifier que l'utilisateur est bien celui authentifié
    if (userId !== client.data.userId) {
      return { success: false, error: 'Non autorisé' };
    }
    
    try {
      // Émettre l'événement à tous les clients dans la conversation sauf l'émetteur
      client.to(conversationId).emit('typing', {
        conversationId,
        userId,
        isTyping,
        timestamp: new Date().toISOString()
      });
      
      return { success: true };
    } catch (error) {
      this.logger.error(`Erreur lors de l'envoi du statut de frappe: ${error.message}`);
      return { success: false, error: error.message };
    }
  }
  
  @SubscribeMessage('icebreakerReady')
  async handleIcebreakerReady(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversationId: string; userId: string; isIcebreakerReady: boolean  }
  ) {
    const { conversationId, userId, isIcebreakerReady } = data;
    console.log("icebreakerReady", userId, conversationId, isIcebreakerReady);
    
    // Vérifier que l'utilisateur est bien celui authentifié
    if (userId !== client.data.userId) {
      return { success: false, error: 'Non autorisé' };
    }
    
    try {
      // Sauvegarder le nouveau statut dans la base de données et redis
      await this.icebreakerService.setParticipantIcebreakerReady(conversationId, userId, isIcebreakerReady);
      
      // Émettre l'événement de mise à jour du statut de l'icebreaker à tous les clients dans la conversation
      client.join(conversationId);
      this.emitIcebreakerStatusUpdate(conversationId, userId, isIcebreakerReady);
      
      const allReady = await this.icebreakerService.areAllParticipantsReady(conversationId);
      
      if (allReady) {
        await this.triggerIcebreakerQuestion(conversationId, client);
      }
      
      return { success: true, userId: userId, isIcebreakerReady: isIcebreakerReady };
    } catch (error) {
      this.logger.error(`Erreur lors de l'envoi du message: ${error.message}`);
      return { success: false, error: error.message };
    } 
    
  }
  
  @SubscribeMessage('icebreakerResponse')
  handleIcebreakerResponse(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversationId: string; response: any }
  ) {
    const userId = client.data.userId;
    const { conversationId, response } = data;
    
    this.server.to(conversationId).emit('icebreakerResponse', {
      userId,
      conversationId,
      response,
      timestamp: new Date().toISOString()
    });
    
    return { success: true };
  }
  
  private async triggerIcebreakerQuestion(conversationId: string, client: Socket) {
    const participants = await this.prisma.conversationParticipant.findMany({
      where: { conversationId },
      select: { userId: true }
    });
    
    if (participants.length < 2) {
      this.logger.warn(`Conversation ${conversationId} does not have 2 participants.`);
      return;
    }
    
    const [a, b] = participants;
    const questionGroup = await this.questionService.getNextRandomQuestionGroup(a.userId, b.userId);
    console.log('questionGroup', typeof questionGroup);
    console.log('chatGateway', questionGroup?.id, questionGroup?.questions[0].question)
    
    if (!questionGroup) return;
    await this.icebreakerService.storeCurrentQuestionGroupForAGivenConversation(conversationId, questionGroup);
    
    client.join(conversationId);
    this.server.to(conversationId).emit('icebreakerQuestionGroup', {
      questionGroup,
      conversationId,
      timestamp: new Date().toISOString()
    });
    
    this.logger.log(`Question envoyée à ${conversationId} : ${questionGroup.questions[0].question}`);
  }
  
  private emitIcebreakerStatusUpdate(conversationId: string, userId: string, isReady: boolean) {
    this.server.to(conversationId).emit('icebreakerStatusUpdated', {
      userId,
      conversationId,
      isIcebreakerReady: isReady,
      timestamp: new Date().toISOString()
    });
    
    this.logger.log(`Status updated for user ${userId} in conversation ${conversationId}: ready=${isReady}`);
  }
  
  
  // Émettre la réponse de chaque utilisateur à la question par socket.io
  public async emitIcebreakerResponsesToAllParticipants(conversationId: string, questionGroupId: string, userId1: string, optionId1: string, userId2: string, optionId2: string) {
    console.log('emitIcebreakerResponsesToAllParticipants', conversationId, questionGroupId, userId1, optionId1, userId2, optionId2);
    const socketData = {
      conversationId,
      questionGroupId,
      userId1,
      optionId1,
      userId2,
      optionId2,
      answeredAt: new Date().toISOString()
    };
    this.server.to(conversationId).emit('icebreakerResponses', socketData);
    this.logger.log(`Responses for User ${userId1} : ${optionId1} and for ${userId2} : ${optionId2} in conversation ${conversationId}`);
  }

  // Nouvelle méthode pour rejoindre toutes les conversations de l'utilisateur
  private async joinUserConversations(client: Socket, userId: string) {
    try {
      // Trouver toutes les conversations auxquelles l'utilisateur participe
      const conversations = await this.prisma.conversationParticipant.findMany({
        where: { userId },
        select: { 
          conversationId: true,
          conversation: {
            include: {
              participants: true
            }
          }
        }
      });

      this.logger.log(`Rejoindre ${conversations.length} conversations pour l'utilisateur ${userId}`);
      
      // Rejoindre chaque conversation
      for (const convo of conversations) {
        const conversationId = convo.conversationId;
        client.join(conversationId);
        
        // Synchroniser l'état de la conversation
        await this.synchronizeConversationState(client, conversationId, userId, convo.conversation.participants);
      }
    } catch (error) {
      this.logger.error(`Erreur lors de la récupération des conversations: ${error.message}`);
      throw error;
    }
  }

  // Nouvelle méthode pour synchroniser l'état d'une conversation
  private async synchronizeConversationState(
    client: Socket, 
    conversationId: string, 
    userId: string,
    participants: any[]
  ) {
    try {
      // 1. Synchroniser l'état de la question Icebreaker
      const questionGroupKey = `conversation:${conversationId}:icebreaker:questionGroup`;
      const questionGroup = await this.redis.get(questionGroupKey);
      
      if (questionGroup) {
        client.emit('icebreakerQuestionGroup', {
          questionGroup: JSON.parse(questionGroup),
          conversationId,
          timestamp: new Date().toISOString()
        });
      }
      
      // 2. Synchroniser les statuts des participants
      for (const participant of participants) {
        client.emit('icebreakerStatusUpdated', {
          userId: participant.userId,
          conversationId,
          isIcebreakerReady: participant.isIcebreakerReady,
          timestamp: new Date().toISOString()
        });
      }
      
      // 3. Synchroniser les réponses aux questions d'icebreaker
      if (participants.length === 2) {
        const user1 = participants[0].userId;
        const user2 = participants[1].userId;
        
        const response1Key = `icebreaker:response:${conversationId}:${user1}`;
        const response2Key = `icebreaker:response:${conversationId}:${user2}`;
        
        const response1 = await this.redis.get(response1Key);
        const response2 = await this.redis.get(response2Key);
        
        // Si les deux participants ont répondu, envoyer les réponses
        if (response1 && response2) {
          const parsedResponse1 = JSON.parse(response1);
          const parsedResponse2 = JSON.parse(response2);
          
          client.emit('icebreakerResponses', {
            conversationId,
            questionGroupId: parsedResponse1.questionGroupId,
            userId1: user1,
            optionId1: parsedResponse1.optionId,
            userId2: user2,
            optionId2: parsedResponse2.optionId,
            answeredAt: new Date().toISOString()
          });
        }
      }
      
      // 4. Synchroniser le statut de frappe de l'autre participant
      const otherParticipant = participants.find(p => p.userId !== userId);
      if (otherParticipant) {
        const typingKey = `conversation:${conversationId}:typing:${otherParticipant.userId}`;
        const isTyping = await this.redis.get(typingKey);
        
        if (isTyping) {
          client.emit('typing', {
            conversationId,
            userId: otherParticipant.userId,
            isTyping: true,
            timestamp: new Date().toISOString()
          });
        }
      }
    } catch (error) {
      this.logger.warn(`Erreur lors de la synchronisation de la conversation ${conversationId}: ${error.message}`);
    }
  }
}