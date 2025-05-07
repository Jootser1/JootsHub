import { ReactNode, useEffect } from 'react';
import { useSocketManager } from '@/hooks/useSocketManager';
import { logger } from '@/utils/logger';

interface ChatSocketHandlerProps {
  children: ReactNode;
  conversationId: string;
}

/**
 * Composant qui gère la connexion/déconnexion d'une conversation spécifique
 */
export const ChatSocketHandler = ({ children, conversationId }: ChatSocketHandlerProps) => {
  const { isChatConnected, joinConversation, leaveConversation, isConversationActive } = useSocketManager();
  
  // Rejoindre la conversation quand le composant est monté
  useEffect(() => {
    if (isChatConnected && conversationId) {
      if (!isConversationActive(conversationId)) {
        logger.info(`ChatSocketHandler: Rejoindre la conversation ${conversationId}`);
        joinConversation(conversationId);
      }
      
      // Nettoyage lors du démontage du composant
      return () => {
        logger.info(`ChatSocketHandler: Quitter la conversation ${conversationId}`);
        leaveConversation(conversationId);
      };
    }
  }, [conversationId, isChatConnected, joinConversation, leaveConversation, isConversationActive]);
  
  return <>{children}</>;
}; 