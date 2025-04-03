import { Socket } from 'socket.io';
import { RedisService } from '../../redis/redis.service';
export declare class HeartbeatService {
    private readonly redisService;
    private readonly heartbeatIntervals;
    private readonly logger;
    constructor(redisService: RedisService);
    private getUserInfo;
    startHeartbeat(client: Socket, options?: {
        interval?: number;
        timeout?: number;
    }): void;
    stopHeartbeat(client: Socket): void;
    resetHeartbeatTimeout(client: Socket): void;
    handlePong(client: Socket): Promise<void>;
    cleanupAllHeartbeats(): void;
}
