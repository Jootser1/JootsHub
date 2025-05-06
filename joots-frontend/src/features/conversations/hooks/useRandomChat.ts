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
    } catch (error: any) {
      logger.error('[useRandomChat] Erreur:', error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    startRandomChat
  };
}; 