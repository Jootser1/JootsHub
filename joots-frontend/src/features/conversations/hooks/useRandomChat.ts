import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { conversationService } from '@/features/conversations/services/conversationService';
import { logger } from '@/utils/logger';


export const useRandomChat = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const startRandomChat = async () => {
    setIsLoading(true);
    try {
      const { conversationId } = await conversationService.startRandomChat();
      toast.success('Conversation créée ! Redirection vers le chat...');
      router.push(`/chat/${conversationId}`);
    } catch (error: unknown) {
      logger.error('[useRandomChat] Erreur:', error instanceof Error ? error : new Error(String(error)));
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    startRandomChat
  };
}; 