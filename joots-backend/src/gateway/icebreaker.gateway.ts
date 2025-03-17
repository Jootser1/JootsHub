import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { createClient } from "redis";
import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";


@WebSocketGateway({ cors: { origin: "*" } })
@Injectable()
export class IcebreakerGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private redisClient = createClient({ url: process.env.REDIS_URL });

  async handleConnection(client: Socket) {
    await this.redisClient.connect();

    try {
      const { token } = client.handshake.auth;
      if (!token) throw new Error("Token manquant");

      // Vérifier et décoder le JWT
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      const username = decoded.pseudo;
      console.log("username dans icebreaker gateway", username); // Associer au pseudo réel

      // Stocker dans Redis avec expiration automatique (ex: 10 minutes)
      await this.redisClient.sAdd("online_users", username);
      await this.redisClient.expire("online_users", 600); 

      // Notifier les autres utilisateurs
      this.server.emit("user_connected", username);

      // Envoyer la liste des utilisateurs connectés
      const users = await this.redisClient.sMembers("online_users");
      client.emit("users_connected", users);
    } catch (error) {
      client.disconnect();
    }
  }

  async handleDisconnect(client: Socket) {
    try {
      const { token } = client.handshake.auth;
      if (!token) throw new Error("Token manquant");
      
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      const username = decoded.pseudo;
      await this.redisClient.sRem("online_users", username);
      this.server.emit("user_disconnected", username);
    } catch (error) {
      client.disconnect();
    }
  }
}
