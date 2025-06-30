import {
  WebSocketGateway,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { PrismaService } from '../prisma/prisma.service';
import { BaseGateway } from './base.gateway';
import { RedisService } from '../redis/redis.service';
import { QuestionService } from '../questions/question.service';
import { IcebreakerService } from '../icebreakers/icebreaker.service';
import { xp_and_level } from '@shared/conversation.types';
import { ConversationsService } from 'src/conversations/conversations.service';
import { CurrentPollWithRelations } from '@shared/question.types';
import { ParticipantIcebreakerStatus } from '@shared/conversation.types';



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
    const user_id = client.data.user_id;
    if (!user_id) return;

    try {
      // Nettoyage des maps
      this.userChatSockets.delete(user_id);
      this.chatSocketUsers.delete(client.id);

      // Récupérer toutes les conversations de l'utilisateur
      const conversationsIds =
        await this.conversationsService.findAllConversationsIdsForAUserId(
          user_id
        );

      for (const conversation_id of conversationsIds) {
        // Quitter la room
        client.leave(conversation_id);

        // Notifier les autres participants que l'utilisateur n'est plus en train de taper
        this.server.to(conversation_id).emit('typing', {
          conversation_id: conversation_id,
          user_id: user_id,
          is_typing: false,
          timestamp: new Date().toISOString(),
        });
      }

      this.logger.log(
        `[Chat Socket ${client.id}] ${user_id} : Déconnexion chat réussie`
      );
    } catch (error) {
      this.logger.error(
        `[Chat Socket ${client.id}] ${user_id} : Erreur lors de la déconnexion: ${error.message}`
      );
    }
  }

  @SubscribeMessage('joinConversation')
  handleJoinConversation(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversation_id: string; user_id: string }
  ) {
    
    // Validation des données
    if (!data.conversation_id || data.conversation_id === 'null' || data.conversation_id === 'undefined') {
      this.logger.warn(
        `[Chat Socket ${client.id}] ${data.user_id} : Tentative de rejoindre une conversation avec un ID invalide: ${data.conversation_id}`
      );
      return { success: false, error: 'ID de conversation invalide' };
    }

    try {
      client.join(data.conversation_id);
      this.logger.debug(
        `[Chat Socket ${client.id}] ${data.user_id} : a rejoint la conversation ${data.conversation_id}`
      );
      return { success: true };
    } catch (error) {
      this.logger.error(
        `[Chat Socket ${client.id}] ${data.user_id} : Erreur lors de la jonction à la conversation ${data.conversation_id}:`,
        error
      );
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('leaveConversation')
  handleLeaveConversation(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversation_id: string; user_id: string }
  ) {
    
    try {
      client.leave(data.conversation_id);
      this.logger.debug(
        `[Chat Socket ${client.id}] ${data.user_id} : a quitté la conversation ${data.conversation_id}`
      );
      return { success: true };
    } catch (error) {
      this.logger.error(
        `[Chat Socket ${client.id}] ${data.user_id} : Erreur lors du départ de la conversation ${data.conversation_id}:`,
        error
      );
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: { conversation_id: string; content: string; user_id: string }
  ) {
    const { conversation_id, content, user_id } = data;

    // Vérifier que l'utilisateur est bien celui authentifié
    if (user_id !== client.data.userId) {
      return { success: false, error: 'Non autorisé' };
    }

    try {
      // Vérifier si la conversation existe
      const conversation = await this.prisma.conversation.findUnique({
        where: { conversation_id: conversation_id },
      });

      if (!conversation) {
        return { success: false, error: 'Conversation non trouvée' };
      }
      
      const message = await this.prisma.message.create({
        data: {
          content,
          sender: { connect: { user_id: user_id } },
          conversation: { connect: { conversation_id: conversation_id } },
          status: 'SENT',
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
        conversation_id,
        created_at: message.created_at || new Date().toISOString(),
      };

      // Émettre l'événement à tous les clients dans la conversation
      client.join(conversation_id); // S'assurer que l'émetteur est dans la salle
      this.server.to(conversation_id).emit('newMessage', messageToEmit);

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
    data: { conversation_id: string; user_id: string; is_typing: boolean }
  ) {
    const { conversation_id, user_id, is_typing } = data;


    // Vérifier que l'utilisateur est bien celui authentifié
    if (user_id !== client.data.userId) {
      return { success: false, error: 'Non autorisé' };
    }

    try {
      // Émettre l'événement à tous les clients dans la conversation sauf l'émetteur
      client.to(conversation_id).emit('typing', {
        conversation_id,
        user_id,
        is_typing,
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
    data: { conversation_id: string; user_id: string; is_icebreaker_ready: boolean }
  ) {
    this.logger.debug(`[Chat Socket ${client.id}] ${data.user_id} : icebreakerReady: ${data.is_icebreaker_ready}`);
    const { conversation_id, user_id, is_icebreaker_ready } = data;

    // Vérifier que l'utilisateur est bien celui authentifié
    if (user_id !== client.data.userId) {
      return { success: false, error: 'Non autorisé' };
    }

    try {
      // Sauvegarder le nouveau statut dans la base de données et redis
      await this.icebreakerService.updateParticipantIcebreakerReady(
        conversation_id,
        user_id,
        is_icebreaker_ready
      );

      // Émettre l'événement de mise à jour du statut de l'icebreaker à tous les clients dans la conversation
      client.join(conversation_id);
      this.emitIcebreakerStatusUpdate(
        conversation_id,
        user_id,
        is_icebreaker_ready
      );

      const allReady =
        await this.icebreakerService.areAllParticipantsReady(conversation_id);
      console.log('allReady', allReady);

      if (allReady) {
        await this.triggerIcebreakerQuestion(conversation_id, client);
      }

      return {
        success: true,
        userId: user_id,
        is_icebreaker_ready: is_icebreaker_ready,
      };
    } catch (error) {
      this.logger.error(`Erreur lors de l'envoi du message: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  private emitIcebreakerStatusUpdate(
    conversation_id: string,
    user_id: string,
    is_icebreaker_ready: boolean
  ) {
    this.server.to(conversation_id).emit('icebreakerStatusUpdated', {
      user_id,
      conversation_id,
      is_icebreaker_ready: is_icebreaker_ready,
      timestamp: new Date().toISOString(),
    });

    this.logger.log(
      `Status updated for user ${user_id} in conversation ${conversation_id}: ready=${is_icebreaker_ready}`
    );
  }

  private async triggerIcebreakerQuestion(
    conversation_id: string,
    client: Socket
  ) {
    const participants = await this.prisma.conversationParticipant.findMany({
      where: { conversation_id: conversation_id },
      select: { user_id: true },
    });

    if (participants.length < 2) {
      this.logger.warn(
        `Conversation ${conversation_id} does not have 2 participants.`
      );
      return;
    }

    const [a, b] = participants;
    const poll = await this.questionService.getNextRandomPoll(
      conversation_id,
      a.user_id,
      b.user_id
    );
    console.log('poll', poll);

    if (!poll) return;
    await this.icebreakerService.storeCurrentPollForAGivenConversation(
      conversation_id,
      poll
    );

    this.emitNextPolltoParticipants(client, conversation_id, poll);
  }

  private emitNextPolltoParticipants(client: Socket, conversation_id: string, poll: CurrentPollWithRelations) {
    client.join(conversation_id);
    this.server.to(conversation_id).emit('icebreakerPoll', {
      poll: {
        poll_id: poll.poll_id,
        type: poll.type,
        poll_translations: poll.poll_translations.map(t => ({ translation: t.translation })),
        options: poll.options.map(o => ({
          poll_option_id: o.poll_option_id,
          translations: o.translations
        })),
        categories: poll.categories.map(c => ({
          category_id: c.category_id,
          name: c.name
        }))
      },
      conversation_id,
      timestamp: new Date().toISOString(),
    });

    this.logger.log(
      `Question envoyée à ${conversation_id}`
    );
  }

  // Émettre la réponse de chaque utilisateur à la question par socket.io
  public async emitIcebreakerResponsesToAllParticipants(
    conversation_id: string,
    questionLabel: string,
    user1: string,
    response1: string,
    user2: string,
    response2: string,
    xpAndLevel: xp_and_level
  ) {
    const socketData = {
      conversation_id,
      poll_translation: questionLabel,
      poll_id: 'generated_' + Date.now(),
      user1,
      response1,
      user2,
      response2,
      xp_and_level: xpAndLevel,
      answeredAt: new Date().toISOString(),
    };

      this.server.to(conversation_id).emit('icebreakerResponses', socketData);
  }

  // Nouvelle méthode pour rejoindre toutes les conversations de l'utilisateur
  private async joinUserConversations(client: Socket, user_id: string) {
    /* try {
      // Trouver toutes les conversations auxquelles l'utilisateur participe
      const conversations =
        await this.conversationsService.findAllConversationsWithPollandXpForAUserId(user_id);
      this.logger.log(
        `[Chat Socket ${client.id}] ${user_id} devrait rejoindre ${conversations.length} conversations`
      );

      for (const conversation of conversations) {
        const conversation_id = conversation.conversation_id;
        client.join(conversation_id);

        // Synchroniser l'état de la conversation
        const participants = conversation.participants.map((p) => ({
          user_id: p.user.user_id,
          is_icebreaker_ready: p.is_icebreaker_ready ?? false,
        }));
        await this.synchronizeConversationState(
          client,
          conversation_id,
          user_id,
          participants
        );
      }
    } catch (error) {
      this.logger.error(
        `Erreur lors de la récupération des conversations: ${error.message}`
      );
      throw error;
    }*/
  } 

  // Synchroniser l'état d'une conversation quand on rejoint la discussion
  private async synchronizeConversationState(
    client: Socket,
    conversation_id: string,
    user_id: string,
    participants: ParticipantIcebreakerStatus[]
  ) {
    try {
      await this.synchronizeIcebreakerQuestion(client, conversation_id);
      await this.synchronizeParticipantStatuses(
        client,
        conversation_id,
        participants
      );
      await this.synchronizeIcebreakerResponses(
        client,
        conversation_id,
        participants
      );
      
    } catch (error) {
      this.logger.warn(
        `Erreur lors de la synchronisation de la conversation ${conversation_id}: ${error.message}`
      );
    }
  }

  private async synchronizeIcebreakerQuestion(
    client: Socket,
    conversation_id: string
  ) {
    const pollKey = `conversation:${conversation_id}:icebreaker:poll`;
    const poll = await this.redis.get(pollKey);

    if (poll) {
      this.server.to(conversation_id).emit('icebreakerPoll', {
        poll: JSON.parse(poll),
        conversation_id,
        timestamp: new Date().toISOString(),
      });
    }
  }

  private async synchronizeParticipantStatuses(
    client: Socket,
    conversation_id: string,
    participants: ParticipantIcebreakerStatus[]
  ) {
    for (const participant of participants) {
      this.emitIcebreakerStatusUpdate(
        conversation_id,
        participant.user_id,
        participant.is_icebreaker_ready
      );
    }
  }

  private async synchronizeIcebreakerResponses(
    client: Socket,
    conversation_id: string,
    participants: ParticipantIcebreakerStatus[]
  ) {
    if (participants.length !== 2) return;

    const [user1, user2] = participants.map((p) => p.user_id);
    const response1Key = `icebreaker:${conversation_id}:responses:${user1}`;
    const response2Key = `icebreaker:${conversation_id}:responses:${user2}`;

    const [response1, response2] = await Promise.all([
      this.redis.get(response1Key),
      this.redis.get(response2Key),
    ]);

    if (response1 && response2) {
      const parsedResponse1 = JSON.parse(response1);
      const parsedResponse2 = JSON.parse(response2);

      this.server.to(conversation_id).emit('icebreakerResponses', {
        conversation_id,
        poll_id: parsedResponse1.poll_id,
        user1: user1,
        response1: parsedResponse1.option_id,
        user2: user2,
        response2: parsedResponse2.option_id,
        answered_at: new Date().toISOString(),
      });
    }
  }

}
