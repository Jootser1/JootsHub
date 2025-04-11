import { useContext, useEffect, useState } from 'react';
import { useChatSocketContext } from './ChatSocketProvider';
import { useSession } from 'next-auth/react';
import { useChatStore } from '@/stores/chatStore';
import { logger } from '@/utils/logger';

export const useChatSocket = (conversationId?: string) => {
  const { data: session } = useSession();
  const { socketService, isConnected } = useChatSocketContext();
  const [isLoading, setIsLoading] = useState(true);
  const chatStore = useChatStore();

  // Gestion de la connexion/déconnexion et des événements
  useEffect(() => {
    if (!socketService || !session?.user?.id || !conversationId) return;

    try {
      // Rejoindre la conversation
      socketService.joinConversation(conversationId);
      logger.info(`Rejoint la conversation ${conversationId}`);
      
      setIsLoading(false);
    } catch (error) {
      logger.error(`Erreur lors de la connexion à la conversation ${conversationId}:`, error);
    }

    return () => {
      if (conversationId) {
        socketService.leaveConversation(conversationId);
        logger.info(`Quitté la conversation ${conversationId}`);
      }
    };
  }, [socketService, session?.user?.id, conversationId]);

  const sendMessage = (content: string) => {
    if (!socketService || !session?.user?.id || !conversationId) return;
    
    try {
      socketService.sendMessage(conversationId, content, session.user.id);
      logger.debug(`Message envoyé à la conversation ${conversationId}`);
    } catch (error) {
      logger.error(`Erreur lors de l'envoi du message:`, error);
    }
  };

  const sendTypingStatus = (isTyping: boolean) => {
    if (!socketService || !conversationId) return;
    
    try {
      socketService.sendTypingStatus(conversationId, isTyping);
      logger.debug(`Statut de frappe mis à jour pour la conversation ${conversationId}`);
    } catch (error) {
      logger.error(`Erreur lors de la mise à jour du statut de frappe:`, error);
    }
  };

  return {
    isConnected,
    isLoading,
    sendMessage,
    sendTypingStatus,
    messages: conversationId ? chatStore.messages[conversationId] || [] : [],
    socketService
  };
};