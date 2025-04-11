import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import { logger } from '@/utils/logger';
import { io, Socket } from 'socket.io-client';

// Mapping des namespaces
const NAMESPACE_MAPPING: Record<string, string> = {
  'users': 'user',  // Map 'users' to 'user'
  'chat': 'chat'
};

export const useSocket = (namespace: string) => {
  const { data: session } = useSession();
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!session?.user?.id || !session?.accessToken) {
      logger.info(`Socket ${namespace}: Pas de session, connexion différée`);
      return;
    }

    const BASE_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';
    const mappedNamespace = NAMESPACE_MAPPING[namespace] || namespace;
    const socketUrl = `${BASE_URL}/${mappedNamespace}`;
    
    logger.info(`Socket ${namespace}: Tentative de connexion à ${socketUrl} (namespace mappé: ${mappedNamespace})`);
    
    const socket = io(socketUrl, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
      auth: { userId: session.user.id, token: session.accessToken },
      transports: ['websocket', 'polling'],
      path: '/socket.io'
    });
    
    socketRef.current = socket;
    
    socket.on('connect', () => {
      logger.info(`Socket ${namespace} connecté avec succès`);
      setIsConnected(true);
    });
    
    socket.on('disconnect', (reason) => {
      logger.warn(`Socket ${namespace} déconnecté: ${reason}`);
      setIsConnected(false);
    });
    
    socket.on('connect_error', (error) => {
      logger.error(`Erreur de connexion ${namespace}: ${error.message}`);
      logger.error('Détails de l\'erreur:', error);
    });

    socket.on('ping', () => {
      socket.emit('pong');
    });
    
    return () => {
      logger.info(`Socket ${namespace}: Nettoyage de la connexion`);
      socket.removeAllListeners();
      socket.disconnect();
      setIsConnected(false);
    };
  }, [session?.accessToken, namespace]);

  return {
    socket: socketRef.current,
    isConnected
  };
};