import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { RedisService } from '../../redis/redis.service';

interface HeartbeatIntervals {
  pingInterval: NodeJS.Timeout;
  timeoutId: NodeJS.Timeout;
}

@Injectable()
export class HeartbeatService {
  private readonly heartbeatIntervals = new Map<string, HeartbeatIntervals>();
  private readonly logger = new Logger('HeartbeatService');

  constructor(private readonly redisService: RedisService) {}

  private getUserInfo(client: Socket): string {
    const userId = client.data?.userId || 'unknown';
    const username = client.data?.username || 'unknown';
    return `[User: ${username} (${userId})]`;
  }

  startHeartbeat(
    client: Socket,
    options: {
      interval?: number;
      timeout?: number;
    } = {}
  ) {
    const interval = options.interval || 25000;
    const timeout = options.timeout || 60000;
    const userInfo = this.getUserInfo(client);

    // Envoie un ping
    const pingInterval = setInterval(() => {
      if (client.connected) {
        client.emit('ping');
        this.logger.debug(`Ping sent to client ${client.id} ${userInfo}`);
      }
    }, interval);

    // Gère le timeout
    const timeoutId = setTimeout(() => {
      if (client.connected) {
        this.logger.warn(
          `Client ${client.id} ${userInfo} timeout, disconnecting...`
        );
        client.disconnect();
      }
    }, timeout);

    this.heartbeatIntervals.set(client.id, {
      pingInterval,
      timeoutId,
    });

    this.logger.log(`Heartbeat started for client ${client.id} ${userInfo}`);
  }

  stopHeartbeat(client: Socket) {
    const intervals = this.heartbeatIntervals.get(client.id);
    const userInfo = this.getUserInfo(client);
    if (intervals) {
      clearInterval(intervals.pingInterval);
      clearTimeout(intervals.timeoutId);
      this.heartbeatIntervals.delete(client.id);
      this.logger.log(`Heartbeat stopped for client ${client.id} ${userInfo}`);
    }
  }

  resetHeartbeatTimeout(client: Socket) {
    const intervals = this.heartbeatIntervals.get(client.id);
    const userInfo = this.getUserInfo(client);
    if (intervals) {
      clearTimeout(intervals.timeoutId);
      intervals.timeoutId = setTimeout(() => {
        if (client.connected) {
          this.logger.warn(
            `Client ${client.id} ${userInfo} timeout, disconnecting...`
          );
          client.disconnect();
        }
      }, 60000);
      this.logger.debug(
        `Heartbeat timeout reset for client ${client.id} ${userInfo}`
      );
    }
  }

  async handlePong(client: Socket) {
    this.resetHeartbeatTimeout(client);
    const userInfo = this.getUserInfo(client);
    this.logger.debug(`Pong received from client ${client.id} ${userInfo}`);

    // À chaque pong, rafraîchir le TTL du statut utilisateur dans Redis
    const userId = client.data?.userId;
    if (userId) {
      try {
        // Rafraîchir le TTL - étend la durée de vie du statut en ligne
        await this.redisService.refreshUserStatus(userId);
        this.logger.debug(`Status TTL refreshed for user ${userId}`);
      } catch (error) {
        this.logger.error(`Error refreshing user status TTL: ${error.message}`);
      }
    }
  }

  // Méthode utilitaire pour nettoyer toutes les connexions
  cleanupAllHeartbeats() {
    for (const [clientId, intervals] of this.heartbeatIntervals.entries()) {
      clearInterval(intervals.pingInterval);
      clearTimeout(intervals.timeoutId);
      this.heartbeatIntervals.delete(clientId);
      this.logger.log(`Cleaned up heartbeat for client ${clientId}`);
    }
  }
}
