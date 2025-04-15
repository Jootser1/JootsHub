import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { Conversation } from '@/features/conversations/conversation.types';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { useIcebreaker } from '@/features/icebreakers/hooks/useIcebreaker';
import { getOtherParticipant } from '@/features/conversations/utils/conversationUtils';
import { useUserStore } from '@/features/user/stores/userStore';
import { logger } from '@/utils/logger';
import { ChatSocketService } from '@/features/chat/sockets/chatSocketService';

interface ChatContainerProps {
  conversationId: string;
  conversation: Conversation;
}

export const ChatContainer = ({ conversationId, conversation }: ChatContainerProps) => {
  const { data: session } = useSession();
  const { isReady, handleReady, handleResponse } = useIcebreaker(conversationId);
  const { user } = useUserStore();
  
  if (!user?.id) {
    return <div className="flex items-center justify-center h-full">Utilisateur non trouvé</div>;
  }
  
  const otherUser = getOtherParticipant(conversation, user.id);

  if (!otherUser) {
    return <div className="flex items-center justify-center h-full">Utilisateur non trouvé</div>;
  }
  
  return (
    <div className="flex flex-col h-full">
    <ChatHeader 
    otherUser={otherUser}
    isOnline={otherUser.isOnline}
    />
    <ChatMessages messages={conversation?.messages || []} />
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