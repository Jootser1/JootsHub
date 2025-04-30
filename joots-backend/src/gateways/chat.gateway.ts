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
    private readonly redis: RedisService
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
  handleIcebreakerReady(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversationId: string; userId: string; isIcebreakerReady: boolean  }
  ) {
    const { conversationId, userId, isIcebreakerReady } = data;
    console.log("icebreakerReady", userId, conversationId, isIcebreakerReady);
    
    this.server.to(conversationId).emit('icebreakerReady', {
      userId,
      conversationId,
      isIcebreakerReady,
      timestamp: new Date().toISOString()
    });
    
    return { success: true };
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
} 