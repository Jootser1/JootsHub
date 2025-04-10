import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { logger } from '@/utils/logger';
import { BaseSocketService } from '@/app/sockets/BaseSocketService';
import { UserSocketService } from '@/app/sockets/user/userSocketService';

class SocketService extends BaseSocketService {
  constructor(namespace: string) {
    super(namespace);
  }
}

export const useSocket = (namespace: string) => {
  const { data: session } = useSession();
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<BaseSocketService | null>(null);

  useEffect(() => {
    if (!session?.user?.id || !session?.accessToken) {
      logger.warn('useSocket: Session utilisateur non disponible');
      return;
    }

    const socketService = namespace === 'users' 
      ? UserSocketService.getInstance()
      : new SocketService(namespace);
      
    socketRef.current = socketService;
    
    socketService.connect(session.user.id, session.accessToken);
    
    const unsubscribe = socketService.onSocketConnectionChange((status: boolean) => {
      setIsConnected(status);
    });
    
    return () => {
      unsubscribe();
      socketService.disconnect();
      setIsConnected(false);
    };
  }, [session?.user?.id, session?.accessToken, namespace]);

  return {
    socket: socketRef.current,
    isConnected
  };
};