import { useEffect, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { UserSocketContext } from './userSocketContext';
import { logger } from '@/utils/logger';

export const useUserSocket = () => {
  const { data: session } = useSession();
  const socketService = useContext(UserSocketContext);

  // Gestion du cycle de vie du socket et des événements
  useEffect(() => {
    if (!socketService || !session?.user?.id) return;

    // 1. Enregistrement des handlers d'événements
    socketService.registerEvents();

    // 2. Mise en ligne de l'utilisateur
    socketService.updateUserStatus(session.user.id, true);

    // 3. Nettoyage à la destruction
    return () => {
      socketService.updateUserStatus(session.user.id, false);
      socketService.unregisterEvents();
    };
  }, [socketService, session?.user?.id]);

  // Gestion de la fermeture de la fenêtre
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (socketService?.isConnected() && session?.user?.id) {
        socketService.updateUserStatus(session.user.id, false);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [socketService, session?.user?.id]);

  return {
    socketService,
    isConnected: socketService?.isConnected() ?? false,
    updateUserStatus: (userId: string, isOnline: boolean) => 
      socketService?.updateUserStatus(userId, isOnline)
  };
};
