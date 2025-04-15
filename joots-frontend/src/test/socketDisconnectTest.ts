// Test de déconnexion socket
import { useUserSocketStore } from '@/features/user/stores/userSocketStore';
import { useUserStore } from '@/features/user/stores/userStore';
import { logger } from '@/utils/logger';

export async function testSocketDisconnection(userId: string, token: string) {
  try {
    // 1. Connexion
    logger.info('Test de connexion socket...');
    const userSocketStore = useUserSocketStore.getState();
    const socket = await userSocketStore.connectUserSocket(userId, token);
    logger.info(`Socket connecté: ${socket.isConnected()}`);
    
    // Vérifier statut de connexion dans le store user
    const userBeforeDisconnect = useUserStore.getState().user;
    logger.info(`Statut utilisateur après connexion: ${userBeforeDisconnect?.isOnline}`);
    
    // 2. Déconnexion
    logger.info('Test de déconnexion socket...');
    userSocketStore.disconnectUserSocket();
    
    // 3. Vérifier le statut utilisateur après déconnexion
    const userAfterDisconnect = useUserStore.getState().user;
    logger.info(`Statut utilisateur après déconnexion: ${userAfterDisconnect?.isOnline}`);
    
    return {
      isDisconnected: !userSocketStore.userSocket?.isConnected(),
      userStatusBeforeDisconnect: userBeforeDisconnect?.isOnline,
      userStatusAfterDisconnect: userAfterDisconnect?.isOnline
    };
  } catch (error) {
    logger.error('Erreur lors du test de déconnexion:', error);
    return { error: String(error) };
  }
} 