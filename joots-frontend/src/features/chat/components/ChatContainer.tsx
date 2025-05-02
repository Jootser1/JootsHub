import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { Conversation } from '@/features/conversations/conversation.types';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { useIcebreaker } from '@/features/icebreakers/hooks/useIcebreaker';
import { getOtherParticipantInConversation } from '@/features/conversations/utils/conversationUtils';
import { useUserStore } from '@/features/user/stores/userStore';
import { useChatStore } from '../stores/chatStore';
import IcebreakerModal from '@/features/icebreakers/components/IcebreakerModal';

interface ChatContainerProps {
  conversation: Conversation;
}

export const ChatContainer = ({ conversation }: ChatContainerProps) => {
  const { activeConversationId, getParticipant, getOtherParticipant} = useChatStore();
  const user = useUserStore((state) => state.user);

  if (!user?.id) return null;
  const otherParticipant = getOtherParticipantInConversation(conversation, user.id);

  const { isReady, handleReady, handleResponse } = useIcebreaker(activeConversationId || '');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (!activeConversationId) return null;
  const isCurrentUserReady = getParticipant(activeConversationId, user.id)?.isIcebreakerReady;
  const isOtherParticipantReady = getOtherParticipant(activeConversationId, user.id)?.isIcebreakerReady;  

  const [isModalOpen, setModalOpen] = useState(false);

  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();

    const input = document.getElementById("chat-input");
    input?.addEventListener("focus", scrollToBottom);

    return () => {
      input?.removeEventListener("focus", scrollToBottom);
    };
  }, [conversation?.messages.length]);

  // Ouvrir la modale si les deux participants sont prêts
  useEffect(() => {
    if (isCurrentUserReady && isOtherParticipantReady) {
      setModalOpen(true);
    }
  }, [isCurrentUserReady, isOtherParticipantReady]);



  if (!activeConversationId) {
    return <div className="flex items-center justify-center h-full">Conversation non trouvée</div>;
  }

  if (!user?.id) {
    return <div className="flex items-center justify-center h-full">Utilisateur non trouvé</div>;
  }
  
  const otherUser = getOtherParticipantInConversation(conversation, user.id);

  if (!otherUser) {
    return <div className="flex items-center justify-center h-full">Utilisateur non trouvé</div>;
  }
  
  return (
    <div className="relative flex flex-col h-full bg-gray-50">
      <ChatHeader 
        otherUser={otherUser} 
        isOnline={otherUser.isOnline} 
        conversationId={activeConversationId}
      />
       <IcebreakerModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <div className="flex-1 overflow-y-auto">
        <ChatMessages messages={conversation?.messages || []} conversationId={activeConversationId} />
      </div>
      <ChatInput conversationId={activeConversationId} />
    </div>
  );
}; 