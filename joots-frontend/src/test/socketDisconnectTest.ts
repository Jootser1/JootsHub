// Test de déconnexion socket
import { socketManager } from '@/lib/sockets/socketManager';
import { useUserStore } from '@/features/user/stores/userStore';
import { logger } from '@/utils/logger';

export async function testSocketDisconnection(userId: string, token: string) {
  try {
    // 1. Connexion
    logger.info('Test de connexion socket...');
    socketManager.setCredentials(userId, token);
    const socket = await socketManager.connectUserSocket();
    logger.info(`Socket connecté: ${socket.isConnected()}`);
    
    // Vérifier statut de connexion dans le store user
    const userBeforeDisconnect = useUserStore.getState().user;
    logger.info(`Statut utilisateur après connexion: ${userBeforeDisconnect?.isOnline}`);
    
    // 2. Déconnexion
    logger.info('Test de déconnexion socket...');
    socketManager.disconnectUserSocket();
    
    // 3. Vérifier le statut utilisateur après déconnexion
    const userAfterDisconnect = useUserStore.getState().user;
    logger.info(`Statut utilisateur après déconnexion: ${userAfterDisconnect?.isOnline}`);
    
    return {
      isDisconnected: !socket.isConnected(),
      userStatusBeforeDisconnect: userBeforeDisconnect?.isOnline,
      userStatusAfterDisconnect: userAfterDisconnect?.isOnline
    };
  } catch (error) {
    logger.error('Erreur lors du test de déconnexion:', error as Error);
    return { error: String(error) };
  }
} 