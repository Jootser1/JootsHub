import { useState } from 'react';
import { IcebreakerResponse } from '@/types/chat';
import { useChatSocket } from '@/hooks/useChatSocket';

export const useIcebreaker = (conversationId: string) => {
  const [isReady, setIsReady] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<string | undefined>();
  const { isConnected, sendIcebreakerReady, sendIcebreakerResponse } = useChatSocket(conversationId);

  const handleReady = () => {
    if (!isConnected) {
      console.error('WebSocket non connecté');
      return;
    }

    try {
      sendIcebreakerReady();
      setIsReady(true);
    } catch (err) {
      console.error('Erreur lors de la préparation de l\'icebreaker:', err);
    }
  };

  const handleResponse = (response: IcebreakerResponse) => {
    if (!isConnected) {
      console.error('WebSocket non connecté');
      return;
    }

    try {
      sendIcebreakerResponse(response);
    } catch (err) {
      console.error('Erreur lors de l\'envoi de la réponse:', err);
    }
  };

  return {
    isReady,
    currentQuestion,
    handleReady,
    handleResponse
  };
}; 