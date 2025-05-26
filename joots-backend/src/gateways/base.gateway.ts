import {
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

export abstract class BaseGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  protected readonly logger: Logger;

  constructor(name: string) {
    this.logger = new Logger(name);
  }

  // Middleware d'authentification commun
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
        next(new Error("Erreur d'authentification"));
      }
    });
  }

  // Décodage simple du token
  protected extractUserIdFromToken(token: string): string | null {
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

  // Méthodes abstraites que les classes dérivées doivent implémenter
  abstract handleConnection(client: Socket): void;
  abstract handleDisconnect(client: Socket): void;
}
