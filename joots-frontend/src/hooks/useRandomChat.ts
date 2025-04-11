import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { chatService } from '@/services/chatService';
import { logger } from '@/utils/logger';

export const useRandomChat = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const startRandomChat = async () => {
    setIsLoading(true);
    try {
      const { conversationId } = await chatService.startRandomChat();
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