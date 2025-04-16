import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { Conversation } from '@/features/conversations/conversation.types';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { useIcebreaker } from '@/features/icebreakers/hooks/useIcebreaker';
import { getOtherParticipant } from '@/features/conversations/utils/conversationUtils';
import { useUserStore } from '@/features/user/stores/userStore';
import { useChatStore } from '../stores/chatStore';


interface ChatContainerProps {
  conversation: Conversation;
}

export const ChatContainer = ({ conversation }: ChatContainerProps) => {
  const conversationId = useChatStore((state) => state.activeConversationId);
  const { isReady, handleReady, handleResponse } = useIcebreaker(conversationId || '');
  const { user } = useUserStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  

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



  if (!conversationId) {
    return <div className="flex items-center justify-center h-full">Conversation non trouvée</div>;
  }

  if (!user?.id) {
    return <div className="flex items-center justify-center h-full">Utilisateur non trouvé</div>;
  }
  
  const otherUser = getOtherParticipant(conversation, user.id);
  console.log('otherUser dans ChatContainer', otherUser);

  if (!otherUser) {
    return <div className="flex items-center justify-center h-full">Utilisateur non trouvé</div>;
  }
  
  return (
    <div className="relative flex flex-col h-full bg-gray-50">
      <ChatHeader otherUser={otherUser} isOnline={otherUser.isOnline} />
      <div className="flex-1 overflow-y-auto">
        <ChatMessages messages={conversation?.messages || []} conversationId={conversationId} />
      </div>
      <ChatInput 
        conversationId={conversationId}
        currentUserId={user.id}
        isIcebreakerReady={isReady}
        onIcebreakerReady={handleReady}
        onIcebreakerResponse={handleResponse}
      />
    </div>
  );
}; 