import { useState, useEffect, useRef } from 'react';
import { Conversation } from '@/features/conversations/conversation.types';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { getOtherParticipantInConversation } from '@/features/conversations/utils/conversationUtils';
import { useUserStore } from '@/features/user/stores/userStore';
import { useChatStore } from '../stores/chatStore';
import IcebreakerPopup from '@/features/icebreakers/components/IcebreakerPopup';
import { IcebreakerService } from '@/features/icebreakers/services/icebreakerService';
import axios from 'axios';

// Définition du type Question pour éviter l'erreur de type
interface Option {
  id: string;
  label: string;
}

interface Question {
  id: string;
  questions: Array<{
    question: string;
  }>;
  options: Option[];
  category?: {
    name: string;
  };
  categories?: {
    logo?: string;
  };
}

interface ChatContainerProps {
  conversation: Conversation;
}

export const ChatContainer = ({ conversation }: ChatContainerProps) => {
  const { activeConversationId, getParticipant, getOtherParticipant, currentQuestionGroup} = useChatStore();
  console.log('currentQuestionGroup', currentQuestionGroup);
  const user = useUserStore((state) => state.user);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const isCurrentUserReady = activeConversationId && user?.id ? getParticipant(activeConversationId, user.id)?.isIcebreakerReady : false;
  const isOtherParticipantReady = activeConversationId && user?.id ? getOtherParticipant(activeConversationId, user.id)?.isIcebreakerReady : false;
  

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAnswerQuestion = (questionGroupId: string, optionId: string) => {
    if (!user?.id || !activeConversationId) return;
    IcebreakerService.submitIcebreakerResponse(user.id, questionGroupId, optionId, activeConversationId);
    console.log(`Réponse validée: Question ${questionGroupId}, Option ${optionId}`);
    setShowQuestion(false);
  };

  const handleCloseQuestion = () => {
    setShowQuestion(false);
  };
  
  // Scroll to bottom of the chat
  useEffect(() => {
    scrollToBottom();
    const input = document.getElementById("chat-input");
    input?.addEventListener("focus", scrollToBottom);
    return () => {
      input?.removeEventListener("focus", scrollToBottom);
    };
  }, [conversation?.messages.length]);

  // Show the question if the current user and the other participant are ready
  useEffect(() => {
    console.log('currentQuestionGroup', currentQuestionGroup);
    console.log('showQuestion', showQuestion);
    console.log('isCurrentUserReady', isCurrentUserReady);
    console.log('isOtherParticipantReady', isOtherParticipantReady);
    if (currentQuestionGroup && isCurrentUserReady && isOtherParticipantReady) {
      setShowQuestion(true);
    }
  }, [isCurrentUserReady, isOtherParticipantReady, currentQuestionGroup]);


  if (!activeConversationId || !user?.id) return null;
  const otherUser = getOtherParticipantInConversation(conversation, user.id);

  if (!otherUser) {
    return <div className="flex items-center justify-center h-full">Utilisateur non trouvé</div>;
  }
  
  return (
    <>
      {currentQuestionGroup && (
        <IcebreakerPopup
          question={JSON.parse(currentQuestionGroup)}
          isVisible={showQuestion}
          onAnswer={handleAnswerQuestion}
          onClose={handleCloseQuestion}
        />
      )}
      <div className="relative flex flex-col h-full bg-gray-50">
        <ChatHeader 
          otherUser={otherUser} 
          isOnline={otherUser.isOnline} 
          conversationId={activeConversationId}
        />
        <div className="flex-1 overflow-y-auto">
          <ChatMessages messages={conversation?.messages || []} conversationId={activeConversationId} />
        </div>
        <ChatInput conversationId={activeConversationId} />
      </div>
    </>
  );
}; 