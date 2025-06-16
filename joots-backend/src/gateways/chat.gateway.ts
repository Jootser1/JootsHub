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
import { ProgressionResult } from '@shared/conversation.types';
import { ConversationsService } from 'src/conversations/conversations.service';

interface ParticipantIceStatus {
  user_id: string;
  is_icebreaker_ready: boolean;
}

@WebSocketGateway({
  cors: {
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://joots.app'
        : 'http://localhost:3000',
    credentials: true,
  },
  namespace: 'chat',
})
export class ChatGateway extends BaseGateway {
  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    private readonly questionService: QuestionService,
    private readonly icebreakerService: IcebreakerService,
    private readonly conversationsService: ConversationsService
  ) {
    super(ChatGateway.name);
  }

  // Map userId → socketId
  private userChatSockets = new Map<string, string>();
  // Map socketId → userId (pour cleanup)
  private chatSocketUsers = new Map<string, string>();

  handleConnection(client: Socket) {
    const userId = client.data.userId;

    if (!userId) {
      this.logger.warn(
        `[Chat Socket ${client.id}] Connexion rejetée sans ID utilisateur`
      );
      client.disconnect();
      return;
    }

    // Enregistrement des maps
    this.userChatSockets.set(userId, client.id);
    this.chatSocketUsers.set(client.id, userId);

    // Rejoindre automatiquement toutes les conversations de l'utilisateur
    this.joinUserConversations(client, userId).catch((error) => {
      this.logger.error(
        `[Chat Socket ${client.id}] Erreur lors de la jointure des conversations: ${error.message}`
      );
    });
  }

  async handleDisconnect(client: Socket) {
    const userId = client.data.userId;
    if (!userId) return;

    try {
      // Nettoyage des maps
      this.userChatSockets.delete(userId);
      this.chatSocketUsers.delete(client.id);

      // Récupérer toutes les conversations de l'utilisateur
      const conversationsIds =
        await this.conversationsService.findAllConversationsIdsForAUserId(
          userId
        );

      for (const conversationId of conversationsIds) {
        // Quitter la room
        client.leave(conversationId);

        // Notifier les autres participants que l'utilisateur n'est plus en train de taper
        this.server.to(conversationId).emit('typing', {
          conversationId: conversationId,
          userId,
          isTyping: false,
          timestamp: new Date().toISOString(),
        });

        // Réinitialiser le statut icebreaker
        await this.icebreakerService.setParticipantIcebreakerReady(
          conversationId,
          userId,
          false
        );
      }

      this.logger.log(
        `[Chat Socket ${client.id}] ${userId} : Déconnexion chat réussie`
      );
    } catch (error) {
      this.logger.error(
        `[Chat Socket ${client.id}] ${userId} : Erreur lors de la déconnexion: ${error.message}`
      );
    }
  }

  @SubscribeMessage('joinConversation')
  handleJoinConversation(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversationId: string; userId: string }
  ) {
    try {
      client.join(data.conversationId);
      this.logger.debug(
        `[Chat Socket ${client.id}] ${data.userId} : a rejoint la conversation ${data.conversationId}`
      );
      return { success: true };
    } catch (error) {
      this.logger.error(
        `[Chat Socket ${client.id}] ${data.userId} : Erreur lors de la jonction à la conversation ${data.conversationId}:`,
        error
      );
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('leaveConversation')
  handleLeaveConversation(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversationId: string; userId: string }
  ) {
    try {
      client.leave(data.conversationId);
      this.logger.debug(
        `[Chat Socket ${client.id}] ${data.userId} : a quitté la conversation ${data.conversationId}`
      );
      return { success: true };
    } catch (error) {
      this.logger.error(
        `[Chat Socket ${client.id}] ${data.userId} : Erreur lors du départ de la conversation ${data.conversationId}:`,
        error
      );
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { conversationId: string; content: string; userId: string }
  ) {
    const { conversationId, content, userId } = data;

    // Vérifier que l'utilisateur est bien celui authentifié
    if (userId !== client.data.userId) {
      return { success: false, error: 'Non autorisé' };
    }

    try {
      // Vérifier si la conversation existe
      const conversation = await this.prisma.conversation.findUnique({
        where: { conversation_id: conversationId },
      });

      if (!conversation) {
        return { success: false, error: 'Conversation non trouvée' };
      }

      const message = await this.prisma.message.create({
        data: {
          content,
          sender: { connect: { user_id: userId } },
          conversation: { connect: { conversation_id: conversationId } },
        },
        include: {
          sender: {
            select: {
              user_id: true,
              username: true,
              avatar: true,
            },
          },
        },
      });

      // Préparer le message à émettre
      const messageToEmit = {
        ...message,
        conversationId,
        created_at: message.created_at || new Date().toISOString(),
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
    @MessageBody()
    data: { conversationId: string; userId: string; isTyping: boolean }
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
        timestamp: new Date().toISOString(),
      });

      return { success: true };
    } catch (error) {
      this.logger.error(
        `Erreur lors de l'envoi du statut de frappe: ${error.message}`
      );
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('icebreakerReady')
  async handleIcebreakerReady(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { conversationId: string; userId: string; isIcebreakerReady: boolean }
  ) {
    const { conversationId, userId, isIcebreakerReady } = data;

    // Vérifier que l'utilisateur est bien celui authentifié
    if (userId !== client.data.userId) {
      return { success: false, error: 'Non autorisé' };
    }

    try {
      // Sauvegarder le nouveau statut dans la base de données et redis
      await this.icebreakerService.setParticipantIcebreakerReady(
        conversationId,
        userId,
        isIcebreakerReady
      );

      // Émettre l'événement de mise à jour du statut de l'icebreaker à tous les clients dans la conversation
      client.join(conversationId);
      this.emitIcebreakerStatusUpdate(
        conversationId,
        userId,
        isIcebreakerReady
      );

      const allReady =
        await this.icebreakerService.areAllParticipantsReady(conversationId);

      if (allReady) {
        await this.triggerIcebreakerQuestion(conversationId, client);
      }

      return {
        success: true,
        userId: userId,
        isIcebreakerReady: isIcebreakerReady,
      };
    } catch (error) {
      this.logger.error(`Erreur lors de l'envoi du message: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  private emitIcebreakerStatusUpdate(
    conversationId: string,
    userId: string,
    isReady: boolean
  ) {
    this.server.to(conversationId).emit('icebreakerStatusUpdated', {
      userId,
      conversationId,
      isIcebreakerReady: isReady,
      timestamp: new Date().toISOString(),
    });

    this.logger.log(
      `Status updated for user ${userId} in conversation ${conversationId}: ready=${isReady}`
    );
  }

  private async triggerIcebreakerQuestion(
    conversationId: string,
    client: Socket
  ) {
    const participants = await this.prisma.conversationParticipant.findMany({
      where: { conversation_id: conversationId },
      select: { user_id: true },
    });

    if (participants.length < 2) {
      this.logger.warn(
        `Conversation ${conversationId} does not have 2 participants.`
      );
      return;
    }

    const [a, b] = participants;
    const poll = await this.questionService.getNextRandomPoll(
      conversationId,
      a.user_id,
      b.user_id
    );

    if (!poll) return;
    await this.icebreakerService.storeCurrentPollForAGivenConversation(
      conversationId,
      poll
    );

    client.join(conversationId);
    this.server.to(conversationId).emit('icebreakerPoll', {
      poll,
      conversationId,
      timestamp: new Date().toISOString(),
    });

    this.logger.log(
      `Question envoyée à ${conversationId} : ${poll.poll_translations[0].translation}`
    );
  }

  // Émettre la réponse de chaque utilisateur à la question par socket.io
  public async emitIcebreakerResponsesToAllParticipants(
    conversationId: string,
    questionLabel: string,
    user1: string,
    response1: string,
    user2: string,
    response2: string,
    xpAndLevel: ProgressionResult
  ) {
    const socketData = {
      conversationId,
      questionLabel,
      user1,
      response1,
      user2,
      response2,
      xpAndLevel,
      answeredAt: new Date().toISOString(),
    };

    this.server.to(conversationId).emit('icebreakerResponses', socketData);
  }

  // Nouvelle méthode pour rejoindre toutes les conversations de l'utilisateur
  private async joinUserConversations(client: Socket, userId: string) {
    try {
      // Trouver toutes les conversations auxquelles l'utilisateur participe
      const conversations =
        await this.conversationsService.findAllConversationsForAUserId(userId);
      this.logger.log(
        `[Chat Socket ${client.id}] ${userId} devrait rejoindre ${conversations.length} conversations`
      );

      for (const conversation of conversations) {
        const conversationId = conversation.conversation_id;
        client.join(conversationId);

        // Synchroniser l'état de la conversation
        const participants = conversation.participants.map((p) => ({
          user_id: p.user.user_id,
          is_icebreaker_ready: p.is_icebreaker_ready,
        }));
        await this.synchronizeConversationState(
          client,
          conversationId,
          userId,
          participants
        );
      }
    } catch (error) {
      this.logger.error(
        `Erreur lors de la récupération des conversations: ${error.message}`
      );
      throw error;
    }
  }

  // Synchroniser l'état d'une conversation quand on rejoint la discussion
  private async synchronizeConversationState(
    client: Socket,
    conversationId: string,
    userId: string,
    participants: ParticipantIceStatus[]
  ) {
    try {
      await this.synchronizeIcebreakerQuestion(client, conversationId);
      await this.synchronizeParticipantStatuses(
        client,
        conversationId,
        participants
      );
      await this.synchronizeIcebreakerResponses(
        client,
        conversationId,
        participants
      );
      await this.synchronizeTypingStatus(
        client,
        conversationId,
        userId,
        participants
      );
    } catch (error) {
      this.logger.warn(
        `Erreur lors de la synchronisation de la conversation ${conversationId}: ${error.message}`
      );
    }
  }

  private async synchronizeIcebreakerQuestion(
    client: Socket,
    conversationId: string
  ) {
    const pollKey = `conversation:${conversationId}:icebreaker:poll`;
    const poll = await this.redis.get(pollKey);

    if (poll) {
      this.server.to(conversationId).emit('icebreakerPoll', {
        poll: JSON.parse(poll),
        conversationId,
        timestamp: new Date().toISOString(),
      });
    }
  }

  private async synchronizeParticipantStatuses(
    client: Socket,
    conversationId: string,
    participants: ParticipantIceStatus[]
  ) {
    for (const participant of participants) {
      this.emitIcebreakerStatusUpdate(
        conversationId,
        participant.user_id,
        participant.is_icebreaker_ready
      );
    }
  }

  private async synchronizeIcebreakerResponses(
    client: Socket,
    conversationId: string,
    participants: ParticipantIceStatus[]
  ) {
    if (participants.length !== 2) return;

    const [user1, user2] = participants.map((p) => p.user_id);
    const response1Key = `icebreaker:${conversationId}:responses:${user1}`;
    const response2Key = `icebreaker:${conversationId}:responses:${user2}`;

    const [response1, response2] = await Promise.all([
      this.redis.get(response1Key),
      this.redis.get(response2Key),
    ]);

    if (response1 && response2) {
      const parsedResponse1 = JSON.parse(response1);
      const parsedResponse2 = JSON.parse(response2);

      this.server.to(conversationId).emit('icebreakerResponses', {
        conversationId,
        pollId: parsedResponse1.pollId,
        userId1: user1,
        optionId1: parsedResponse1.optionId,
        userId2: user2,
        optionId2: parsedResponse2.optionId,
        answeredAt: new Date().toISOString(),
      });
    }
  }

  private async synchronizeTypingStatus(
    client: Socket,
    conversationId: string,
    userId: string,
    participants: any[]
  ) {
    const otherParticipant = participants.find((p) => p.user_id !== userId);
    if (!otherParticipant) return;

    const typingKey = `conversation:${conversationId}:typing:${otherParticipant.user_id}`;
    const isTyping = await this.redis.get(typingKey);

    if (isTyping) {
      client.emit('typing', {
        conversationId,
        userId: otherParticipant.user_id,
        isTyping: true,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
