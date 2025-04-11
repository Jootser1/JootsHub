'use client';

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSocket } from '@/app/sockets/useSocket';
import { useChatStore } from '@/stores/chatStore';
import { useContactStore } from '@/stores/contactStore';
import { logger } from '@/utils/logger';
import { ChatSocketService } from './chatSocketService';

interface ChatSocketContextType {
  socketService: ChatSocketService | null;
  isConnected: boolean;
  isLoading: boolean;
}

export const ChatSocketContext = createContext<ChatSocketContextType | null>(null);

export const ChatSocketProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const { socket, isConnected } = useSocket('chat');
  const [eventsRegistered, setEventsRegistered] = useState(false);
  const socketService = ChatSocketService.getInstance();

  useEffect(() => {
    const setupSocket = async () => {
      if (status !== 'authenticated' || !isConnected || !session?.user?.id || !session?.accessToken) return;
      
      try {
        // Configuration du socket
        socketService.connect(session.user.id, session.accessToken);
        socketService.registerEvents();
        setEventsRegistered(true);
        
        logger.info('Socket chat configuré avec succès');
        setIsLoading(false);
      } catch (error) {
        logger.error("Erreur lors de la configuration du socket chat:", error);
        setIsLoading(false);
      }
    };

    setupSocket();

    return () => {
      if (eventsRegistered) {
        socketService.unregisterEvents();
        setEventsRegistered(false);
      }
    };
  }, [session?.user?.id, session?.accessToken, isConnected, status]);

  return (
    <ChatSocketContext.Provider value={{ socketService, isConnected, isLoading }}>
      {children}
    </ChatSocketContext.Provider>
  );
};

export const useChatSocketContext = () => {
  const context = useContext(ChatSocketContext);
  if (!context) {
    throw new Error('useChatSocketContext must be used within a ChatSocketProvider');
  }
  return context;
}; 