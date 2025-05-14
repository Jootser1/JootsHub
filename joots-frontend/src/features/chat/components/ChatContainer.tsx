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

interface ChatContainerProps {
  conversation: Conversation;
}

export const ChatContainer = ({ conversation }: ChatContainerProps) => {
  const { activeConversationId, getParticipant, getOtherParticipant, getCurrentQuestionGroup } = useChatStore();
  const user = useUserStore((state) => state.user);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  if (!activeConversationId || !user?.id) return null;
  const isCurrentUserReady = getParticipant(activeConversationId, user.id)?.isIcebreakerReady;
  const isOtherParticipantReady = getOtherParticipant(activeConversationId, user.id)?.isIcebreakerReady;  

  const [showQuestion, setShowQuestion] = useState(false)
  const [lastAnswer, setLastAnswer] = useState<{ questionGroupId: string, optionId: string } | null>(null)
  
  const currentQuestionGroup = getCurrentQuestionGroup(activeConversationId)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAnswerQuestion = (questionGroupId: string, optionId: string) => {
    // Enregistrer la dernière réponse
    setLastAnswer({ questionGroupId, optionId })
    IcebreakerService.submitIcebreakerResponse(user.id, questionGroupId, optionId, activeConversationId)
    // Simuler l'envoi à un endpoint (à implémenter dans le futur)
    console.log(`Réponse validée: Question ${questionGroupId}, Option ${optionId}`)
    

    // Dans un cas réel, vous pourriez faire quelque chose comme:
    // 

    // Fermer la question
    setShowQuestion(false)
  }

  const handleCloseQuestion = () => {
    setShowQuestion(false)
  }
  
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
    if (currentQuestionGroup && isCurrentUserReady && isOtherParticipantReady) {
      setShowQuestion(true)
    }
  }, [isCurrentUserReady, isOtherParticipantReady, currentQuestionGroup]);



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
    <>
    <IcebreakerPopup
        question={currentQuestionGroup || ''}
        isVisible={showQuestion}
        onAnswer={handleAnswerQuestion}
        onClose={handleCloseQuestion}
      />
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