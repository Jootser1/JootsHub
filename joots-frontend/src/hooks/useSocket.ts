import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { useStore } from '@/store/store';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 1000;
const HEARTBEAT_INTERVAL = 30000;
const CONNECTION_TIMEOUT = 10000;

interface UserStatusChange {
  userId: string;
  isOnline: boolean;
}

export const useSocket = () => {
  const { data: session } = useSession();
  const socketRef = useRef<Socket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [lastError, setLastError] = useState<Error | null>(null);
  const setOnlineUsers = useStore((state) => state.setOnlineUsers);

  const startHeartbeat = () => {
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
    }

    heartbeatIntervalRef.current = setInterval(() => {
      if (socketRef.current?.connected) {
        socketRef.current.emit('heartbeat');
      }
    }, HEARTBEAT_INTERVAL);
  };

  const stopHeartbeat = () => {
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
      heartbeatIntervalRef.current = null;
    }
  };

  const cleanup = () => {
    stopHeartbeat();
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    setIsConnected(false);
    setLastError(null);
  };

  useEffect(() => {
    if (!session?.accessToken) {
      cleanup();
      return;
    }

    const socket = io(SOCKET_URL, {
      auth: {
        token: session.accessToken
      },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: MAX_RECONNECT_ATTEMPTS,
      reconnectionDelay: RECONNECT_DELAY,
      timeout: CONNECTION_TIMEOUT,
      forceNew: true
    });

    socketRef.current = socket;

    const handleConnect = () => {
      console.log('Socket connected');
      setIsConnected(true);
      setLastError(null);
      reconnectAttemptsRef.current = 0;
      startHeartbeat();
    };

    const handleDisconnect = (reason: string) => {
      console.log('Socket disconnected:', reason);
      setIsConnected(false);
      stopHeartbeat();

      if (reason === 'io server disconnect') {
        // Le serveur a déconnecté le client, on ne tente pas de se reconnecter
        cleanup();
        return;
      }
    };

    const handleError = (error: Error) => {
      console.error('Socket error:', error);
      setLastError(error);
    };

    const handleUserStatusChange = (data: UserStatusChange) => {
      setOnlineUsers((prev) => {
        const newUsers = new Set(prev);
        if (data.isOnline) {
          newUsers.add(data.userId);
        } else {
          newUsers.delete(data.userId);
        }
        return newUsers;
      });
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('error', handleError);
    socket.on('userStatusChange', handleUserStatusChange);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('error', handleError);
      socket.off('userStatusChange', handleUserStatusChange);
      cleanup();
    };
  }, [session?.accessToken]);

  return {
    socket: socketRef.current,
    isConnected,
    lastError
  };
};