import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@WebSocketGateway({
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? 'https://joots.app' 
      : 'http://localhost:3000',
    credentials: true
  },
  namespace: 'chat'
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  
  private readonly logger = new Logger(ChatGateway.name);
  
  constructor(
    private readonly prisma: PrismaService
  ) {}
  
  // Même middleware d'authentification que le UserGateway
  afterInit(server: Server) {
    server.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        const userId = socket.handshake.auth.userId;
        
        if (!token || !userId) {
          return next(new Error('Authentification requise'));
        }
        
        // Extraire le userId du token
        const validUserId = this.extractUserIdFromToken(token);
        
        if (!validUserId || validUserId !== userId) {
          return next(new Error('Token invalide'));
        }
        
        // Ajouter l'ID utilisateur au socket
        socket.data.userId = userId;
        next();
      } catch (error) {
        next(new Error('Erreur d\'authentification'));
      }
    });
  }
  
  // Décodage simple du token
  private extractUserIdFromToken(token: string): string | null {
    try {
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) return null;
      
      const payload = JSON.parse(
        Buffer.from(tokenParts[1], 'base64').toString()
      );
      
      return payload.sub;
    } catch (error) {
      return null;
    }
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
    client.join(conversationId);
    this.logger.debug(`Client ${client.id} a rejoint la conversation ${conversationId}`);
    return { success: true };
  }
  
  @SubscribeMessage('leaveConversation')
  handleLeaveConversation(
    @ConnectedSocket() client: Socket,
    @MessageBody() conversationId: string
  ) {
    client.leave(conversationId);
    this.logger.debug(`Client ${client.id} a quitté la conversation ${conversationId}`);
    return { success: true };
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
      // Sauvegarder le message dans la base de données
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
      
      // Émettre l'événement à tous les clients dans la conversation
      this.server.to(conversationId).emit('newMessage', {
        ...message,
        conversationId,
        createdAt: message.createdAt || new Date().toISOString()
      });
      
      return { success: true, message };
    } catch (error) {
      this.logger.error(`Erreur lors de l'envoi du message: ${error.message}`);
      return { success: false, error: error.message };
    }
  }
  
  @SubscribeMessage('icebreakerReady')
  handleIcebreakerReady(
    @ConnectedSocket() client: Socket,
    @MessageBody() conversationId: string
  ) {
    const userId = client.data.userId;
    
    this.server.to(conversationId).emit('icebreakerReady', {
      userId,
      conversationId,
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