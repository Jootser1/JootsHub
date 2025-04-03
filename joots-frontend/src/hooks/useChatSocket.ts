import { useEffect, useCallback, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSocket } from './useSocket';
import { useChatStore } from '@/stores/chatStore';
import { logger } from '@/utils/logger';
import { Message } from '@/types/chat';

export const useChatSocket = (conversationId?: string) => {
  const { data: session } = useSession();
  const { socket, isConnected } = useSocket();
  const chatStore = useChatStore();
  const [localMessages, setLocalMessages] = useState<Message[]>([]);
  
  // Charger les messages du store
  useEffect(() => {
    if (conversationId) {
      const storeMessages = chatStore.messages[conversationId] || [];
      setLocalMessages(storeMessages);
    }
  }, [conversationId, chatStore.messages]);
  
  // Écouter les nouveaux messages
  useEffect(() => {
    if (!conversationId || !isConnected || !socket) return;
    
    // Rejoindre la conversation
    socket.joinConversation(conversationId);
    
    // Configurer l'écouteur pour les nouveaux messages
    const unsubscribe = socket.onNewMessage((message) => {
      logger.debug(`Nouveau message reçu pour conversation ${conversationId}:`, message);
      
      if (message.conversationId === conversationId) {
        const newMessage: Message = {
          id: message.id,
          content: message.content,
          senderId: message.senderId,
          receiverId: message.recipientId || '',
          type: message.type || 'text',
          timestamp: new Date(message.createdAt),
          status: 'delivered' as const
        };
        
        // Mise à jour du store
        chatStore.addMessage(conversationId, newMessage);
        
        // Mise à jour locale
        setLocalMessages(prev => [...prev, newMessage]);
      }
    });
    
    return () => {
      socket.leaveConversation(conversationId);
      unsubscribe();
    };
  }, [conversationId, isConnected, socket, session?.user?.id]);
  
  // Envoyer un message
  const sendMessage = useCallback((content: string) => {
    if (!conversationId || !isConnected || !socket || !session?.user?.id) {
      logger.warn('Impossible d\'envoyer le message: non connecté');
      return;
    }
    
    logger.debug('Envoi du message:', { content, conversationId, userId: session.user.id });
    socket.sendMessage(conversationId, content, session.user.id);
  }, [conversationId, isConnected, socket, session?.user?.id]);
  
  return {
    isConnected,
    sendMessage,
    messages: localMessages // Utiliser l'état local
  };
}; 