import { useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { Message, User } from '@/components/icebreaker/types';

interface UseChatProps {
  conversationId: string;
  onNewMessage?: (message: Message) => void;
}

export const useChat = ({ conversationId, onNewMessage }: UseChatProps) => {
  const socketRef = useRef<Socket | null>(null);
  const { data: session } = useSession();

  // Initialiser la connexion WebSocket
  useEffect(() => {
    if (!session?.user) return;

    // Créer la connexion Socket.IO
    socketRef.current = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000', {
      withCredentials: true,
      auth: {
        userId: session.user.id,
      },
    });

    // Gérer la connexion
    socketRef.current.on('connect', () => {
      console.log('Connected to WebSocket server');
      // Rejoindre la conversation
      socketRef.current?.emit('joinConversation', conversationId);
    });

    // Gérer la déconnexion
    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    // Écouter les nouveaux messages
    socketRef.current.on('newMessage', (message: Message) => {
      onNewMessage?.(message);
    });

    // Nettoyer la connexion lors du démontage du composant
    return () => {
      if (socketRef.current) {
        socketRef.current.emit('leaveConversation', conversationId);
        socketRef.current.disconnect();
      }
    };
  }, [conversationId, session?.user, onNewMessage]);

  // Fonction pour envoyer un message
  const sendMessage = useCallback((content: string) => {
    if (!socketRef.current || !session?.user) return;

    // Envoyer le message au serveur
    socketRef.current.emit('sendMessage', {
      conversationId,
      content,
      userId: session.user.id,
    });
  }, [conversationId, session?.user]);

  return {
    sendMessage,
    isConnected: socketRef.current?.connected || false,
  };
}; 