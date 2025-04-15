import { useState, useCallback } from 'react';
import { useChatSocket } from '@/features/chat/sockets/useChatSocket';
import { logger } from '@/utils/logger';

export const useIcebreaker = (conversationId: string) => {
  const [isReady, setIsReady] = useState(false);
  const { service, isConnected } = useChatSocket();
  
  const handleReady = useCallback(() => {
    if (!isConnected || !service) {
      logger.warn('Impossible de démarrer l\'icebreaker: non connecté');
      return;
    }
    
    try {
      service.getSocket()?.emit('icebreakerReady', conversationId);
      setIsReady(true);
    } catch (error) {
      logger.error('Erreur lors de la préparation de l\'icebreaker:', error);
    }
  }, [conversationId, isConnected, service]);
  
  const handleResponse = useCallback((response: any) => {
    if (!isConnected || !service) {
      logger.warn('Impossible d\'envoyer la réponse: non connecté');
      return;
    }
    
    try {
      service.getSocket()?.emit('icebreakerResponse', { 
        conversationId, 
        response 
      });
    } catch (error) {
      logger.error('Erreur lors de l\'envoi de la réponse:', error);
    }
  }, [conversationId, isConnected, service]);
  
  return {
    isReady,
    handleReady,
    handleResponse
  };
}; 