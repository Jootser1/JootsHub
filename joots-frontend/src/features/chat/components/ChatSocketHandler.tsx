import { ReactNode, useEffect, useRef } from 'react';
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
  const hasJoinedRef = useRef(false);
  const conversationIdRef = useRef(conversationId);
  
  // Mettre à jour la référence si conversationId change
  useEffect(() => {
    conversationIdRef.current = conversationId;
  }, [conversationId]);
  
  // Rejoindre la conversation quand le composant est monté
  useEffect(() => {
    // Ne rien faire si on n'est pas connecté ou si on a déjà rejoint
    if (!isChatConnected || hasJoinedRef.current) return;
    
    // Rejoindre la conversation si on n'y est pas déjà
    if (!isConversationActive(conversationId)) {
      logger.info(`ChatSocketHandler: Rejoindre la conversation ${conversationId}`);
      joinConversation(conversationId);
      hasJoinedRef.current = true;
    } else {
      // Marquer comme rejoint même si on était déjà dans la conversation
      hasJoinedRef.current = true;
    }
    
    // Nettoyage lors du démontage du composant
    return () => {
      if (hasJoinedRef.current) {
        logger.info(`ChatSocketHandler: Quitter la conversation ${conversationIdRef.current}`);
        leaveConversation(conversationIdRef.current);
        hasJoinedRef.current = false;
      }
    };
  }, [isChatConnected, joinConversation, leaveConversation, isConversationActive, conversationId]);
  
  return <>{children}</>;
}; 