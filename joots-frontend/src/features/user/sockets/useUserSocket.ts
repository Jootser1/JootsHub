import { useUserSocketStore } from '@/features/user/stores/userSocketStore';

/**
 * Hook pour utiliser les fonctionnalités du socket utilisateur
 */
export const useUserSocket = () => {
  const { 
    userSocket,
    connectUserSocket,
    disconnectUserSocket
  } = useUserSocketStore();
  
  return {
    // État
    isConnected: userSocket?.isConnected() || false,
    
    // Méthodes
    connect: connectUserSocket,
    disconnect: disconnectUserSocket,
    
    // Accès direct au service si nécessaire
    service: userSocket
  };
}; 