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
  const { activeConversationId, getParticipant, getOtherParticipant, getCurrentQuestionGroup } = useChatStore();
  const user = useUserStore((state) => state.user);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [questionData, setQuestionData] = useState<Question | null>(null);
  
  const currentQuestionGroup = activeConversationId ? getCurrentQuestionGroup(activeConversationId) : null;
  const isCurrentUserReady = activeConversationId && user?.id ? getParticipant(activeConversationId, user.id)?.isIcebreakerReady : false;
  const isOtherParticipantReady = activeConversationId && user?.id ? getOtherParticipant(activeConversationId, user.id)?.isIcebreakerReady : false;

  // Récupérer les données complètes de la question si nécessaire
  useEffect(() => {
    const fetchQuestionData = async () => {
      if (currentQuestionGroup && typeof currentQuestionGroup === 'string') {
        try {
          // Tentative de parsing si c'est un JSON stringifié
          try {
            const parsed = JSON.parse(currentQuestionGroup);
            if (parsed.id) {
              // Charger les données complètes de la question
              const response = await axios.get(`/api/questions/by-id/${parsed.id}`);
              setQuestionData(response.data);
            }
          } catch (error) {
            // Si ce n'est pas un JSON valide, essayer de charger directement par ID
            console.error('Erreur lors du chargement des données de la question:', error);
            const response = await axios.get(`/api/questions/by-id/${currentQuestionGroup}`);
            setQuestionData(response.data);
          }
        } catch (error) {
          console.error('Erreur lors du chargement des données de la question:', error);
          setQuestionData(null);
        }
      }
    };

    fetchQuestionData();
  }, [currentQuestionGroup]);

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
  
  useEffect(() => {
    scrollToBottom();

    const input = document.getElementById("chat-input");
    input?.addEventListener("focus", scrollToBottom);

    return () => {
      input?.removeEventListener("focus", scrollToBottom);
    };
  }, [conversation?.messages.length]);

  useEffect(() => {
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
      {questionData && (
        <IcebreakerPopup
          question={questionData}
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