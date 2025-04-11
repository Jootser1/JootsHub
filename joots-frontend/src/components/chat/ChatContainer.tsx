import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useConversation } from '@/hooks/useConversation';
import { Conversation } from '@/types/chat';
import { User } from '@/types/user';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { useChatSocket } from '@/app/sockets/chat/useChatSocket';
import { useIcebreaker } from '@/hooks/useIcebreaker';
import { getOtherParticipant } from '@/utils/conversationUtils';
import { logger } from '@/utils/logger';

interface ChatContainerProps {
  conversationId: string;
}

export const ChatContainer = ({ conversationId }: ChatContainerProps) => {
  const { data: session } = useSession();
  const { conversations, findConversation } = useConversation();
  const { 
    isConnected, 
    sendMessage, 
    sendTypingStatus,
    messages,
    isLoading: isLoadingMessages
  } = useChatSocket(conversationId);
  const { isReady, currentQuestion, handleReady, handleResponse } = useIcebreaker(conversationId);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    const loadConversation = async () => {
      if (!session?.user?.id || isLoadingRef.current) return;
      
      try {
        isLoadingRef.current = true;
        setIsLoading(true);
        setError(null);
        
        logger.debug('Loading conversation:', conversationId);
        const conv = await findConversation(conversationId);
        setConversation(conv);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement de la conversation';
        logger.error('Error loading conversation:', err);
        setError(errorMessage);
      } finally {
        setIsLoading(false);
        isLoadingRef.current = false;
      }
    };

    loadConversation();
  }, [conversationId, session?.user?.id, findConversation]);

  const handleTypingStatus = (isTyping: boolean) => {
    if (!session?.user?.id || !conversationId) return;
    sendTypingStatus(isTyping);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Chargement de la conversation...</div>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        {error}
      </div>
    );
  }

  if (!conversation || !session?.user?.id) {
    return <div className="flex items-center justify-center h-full">Conversation non trouvée</div>;
  }

  const otherUser = getOtherParticipant(conversation, session.user.id);
  if (!otherUser) {
    return <div className="flex items-center justify-center h-full">Utilisateur non trouvé</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader 
        otherUser={otherUser}
        isOnline={otherUser.isOnline}
      />
      {isLoadingMessages ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Chargement des messages...</div>
        </div>
      ) : (
        <ChatMessages 
          messages={messages}
          currentUserId={session.user.id}
          isConnected={isConnected}
        />
      )}
      <ChatInput 
        conversationId={conversationId}
        currentUserId={session.user.id}
        isConnected={isConnected}
        onSendMessage={sendMessage}
        onTypingStatus={handleTypingStatus}
        isIcebreakerReady={isReady}
        currentQuestion={currentQuestion}
        onIcebreakerReady={handleReady}
        onIcebreakerResponse={handleResponse}
      />
    </div>
  );
}; 