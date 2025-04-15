import { BaseSocketService } from '@/lib/sockets/BaseSocketService';
import { logger } from '@/utils/logger';

/**
 * Attend que la connexion socket soit établie avec un timeout
 * @param socketService Le service socket à surveiller
 * @param timeoutMs Temps maximum d'attente en ms (défaut: 5000ms)
 * @returns Une promesse résolue quand la connexion est établie ou le timeout atteint
 */
export const waitForConnection = async (socketService: BaseSocketService, timeoutMs: number = 5000): Promise<void> => {
    return new Promise<void>((resolve) => {
        let timeoutId: NodeJS.Timeout;
        
        const checkConnection = (status: boolean) => {
            if (status === true) {
                if (timeoutId) clearTimeout(timeoutId);
                cleanup();
                resolve();
            }
        };
        
        const cleanup = socketService.onSocketConnectionChange(checkConnection);
        
        timeoutId = setTimeout(() => {
            cleanup();
            resolve();
            logger.warn('Timeout en attendant la connexion socket');
        }, timeoutMs);
    });
}; 