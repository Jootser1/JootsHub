import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { logger } from '@/utils/logger';
import SocketService from '@/services/SocketService';

export const useSocket = () => {
  const { data: session } = useSession();
  const [isConnected, setIsConnected] = useState(false);
  const [lastError, setLastError] = useState<Error | null>(null);
  const socketServiceRef = useRef<SocketService | null>(null);

  useEffect(() => {
    if (!session?.user?.id || !session?.accessToken) {
      logger.warn('useSocket: Pas de session ou de token');
      return;
    }

    const socketService = SocketService.getInstance();
    socketServiceRef.current = socketService;

    try {
      socketService.initialize(session.user.id, session.accessToken);
      setIsConnected(true);
    } catch (error) {
      logger.error('Erreur d\'initialisation du socket:', error);
      setLastError(error as Error);
      setIsConnected(false);
    }

    return () => {
      if (socketServiceRef.current) {
        socketServiceRef.current.disconnect();
        setIsConnected(false);
      }
    };
  }, [session?.user?.id, session?.accessToken]);

  return {
    socket: socketServiceRef.current?.getSocket() || null,
    isConnected,
    lastError
  };
};