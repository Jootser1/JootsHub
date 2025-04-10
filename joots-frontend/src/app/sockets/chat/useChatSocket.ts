import { useContext, useEffect } from 'react';
import { ChatSocketContext, useChatSocketContext } from './chatSocketContext';
import { useSession } from 'next-auth/react';

export const useChatSocket = (conversationId?: string) => {
  const { data: session } = useSession();
  const socket = useChatSocketContext();
  const socketService = useContext(ChatSocketContext);

  // Gestion de la connexion/déconnexion et des événements
  useEffect(() => {
    if (!socketService || !session?.user?.id) return;

    socketService.registerEvents();

    return () => {
      socketService.unregisterEvents();
    };
  }, [socketService, session?.user?.id]);

  return { socket, socketService };
};