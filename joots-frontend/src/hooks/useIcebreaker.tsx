import { useState, useCallback } from 'react';
import { useSocket } from './useSocket';
import { logger } from '@/utils/logger';

export const useIcebreaker = (conversationId: string) => {
  const [isReady, setIsReady] = useState(false);
  const { socket, isConnected } = useSocket();
  
  const handleReady = useCallback(() => {
    if (!isConnected || !socket) {
      logger.warn('Impossible de démarrer l\'icebreaker: non connecté');
      return;
    }
    
    try {
      socket.getChatSocket()?.emit('icebreakerReady', conversationId);
      setIsReady(true);
    } catch (error) {
      logger.error('Erreur lors de la préparation de l\'icebreaker:', error);
    }
  }, [conversationId, isConnected, socket]);
  
  const handleResponse = useCallback((response: any) => {
    if (!isConnected || !socket) {
      logger.warn('Impossible d\'envoyer la réponse: non connecté');
      return;
    }
    
    try {
      socket.getChatSocket()?.emit('icebreakerResponse', { 
        conversationId, 
        response 
      });
    } catch (error) {
      logger.error('Erreur lors de l\'envoi de la réponse:', error);
    }
  }, [conversationId, isConnected, socket]);
  
  return {
    isReady,
    handleReady,
    handleResponse
  };
}; 