import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { logger } from '@/utils/logger';
import SocketService from '@/services/SocketService';

export const useSocket = () => {
  const { data: session } = useSession();
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<SocketService | null>(null);

  useEffect(() => {
    if (!session?.user?.id || !session?.accessToken) {
      logger.warn('useSocket: Session utilisateur non disponible');
      return;
    }

    // Initialiser le service socket
    const socketService = SocketService.getInstance();
    socketRef.current = socketService;
    
    // Établir la connexion
    socketService.connect(session.user.id, session.accessToken);
    
    // Gérer les changements d'état de connexion
    const unsubscribe = socketService.onConnectionChange((status) => {
      setIsConnected(status);
    });
    
    return () => {
      unsubscribe();
      socketService.disconnect();
      setIsConnected(false);
    };
  }, [session?.user?.id, session?.accessToken]);

  return {
    socket: socketRef.current,
    isConnected
  };
};