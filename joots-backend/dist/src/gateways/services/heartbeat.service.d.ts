import { Socket } from 'socket.io';
export declare class HeartbeatService {
    private readonly heartbeatIntervals;
    private readonly logger;
    private getUserInfo;
    startHeartbeat(client: Socket, options?: {
        interval?: number;
        timeout?: number;
    }): void;
    stopHeartbeat(client: Socket): void;
    resetHeartbeatTimeout(client: Socket): void;
    handlePong(client: Socket): void;
    cleanupAllHeartbeats(): void;
}
