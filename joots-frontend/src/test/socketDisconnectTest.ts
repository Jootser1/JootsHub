// Test de déconnexion socket
import { useSocketStore } from '@/stores/socketStore';
import { useUserStore } from '@/stores/userStore';
import { logger } from '@/utils/logger';

export async function testSocketDisconnection(userId: string, token: string) {
  try {
    // 1. Connexion
    logger.info('Test de connexion socket...');
    const socket = await useSocketStore.getState().connectUserSocket(userId, token);
    logger.info(`Socket connecté: ${socket.isConnected()}`);
    
    // Vérifier statut de connexion dans le store user
    const userBeforeDisconnect = useUserStore.getState().user;
    logger.info(`Statut utilisateur après connexion: ${userBeforeDisconnect?.isOnline}`);
    
    // 2. Déconnexion
    logger.info('Test de déconnexion socket...');
    useSocketStore.getState().disconnectUserSocket();
    
    // 3. Vérifier le statut utilisateur après déconnexion
    const userAfterDisconnect = useUserStore.getState().user;
    logger.info(`Statut utilisateur après déconnexion: ${userAfterDisconnect?.isOnline}`);
    
    return {
      isDisconnected: !useSocketStore.getState().userSocket?.isConnected(),
      userStatusBeforeDisconnect: userBeforeDisconnect?.isOnline,
      userStatusAfterDisconnect: userAfterDisconnect?.isOnline
    };
  } catch (error) {
    logger.error('Erreur lors du test de déconnexion:', error);
    return { error: String(error) };
  }
} 