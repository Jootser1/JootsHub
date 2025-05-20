import { BaseSocketService } from '@/lib/sockets/BaseSocketService';
import { logger } from '@/utils/logger';

/**
 * Attend que la connexion socket soit établie avec un timeout
 * @param socketService Le service socket à surveiller
 * @param timeoutMs Temps maximum d'attente en ms (défaut: 5000ms)
 * @returns Une promesse résolue quand la connexion est établie ou le timeout atteint
 */
export const waitForConnection = async (socketService: BaseSocketService, timeoutMs: number = 5000): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
        // Vérifier immédiatement si déjà connecté
        if (socketService.isConnected()) {
            resolve(true);
            return;
        }
        
        // Vérifier périodiquement la connexion
        const checkInterval = setInterval(() => {
            if (socketService.isConnected()) {
                clearTimeout(timeoutId);
                clearInterval(checkInterval);
                resolve(true);
            }
        }, 500);
        
        const timeoutId = setTimeout(() => {
            clearInterval(checkInterval);
            logger.warn('Timeout en attendant la connexion socket');
            resolve(false);
        }, timeoutMs);
    });
}; 