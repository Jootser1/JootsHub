import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Message, ChatState, ChatStore, MessageStatus} from '@/features/chat/chat.types'; 
import { IcebreakerResponse } from '@/features/icebreakers/icebreaker.types';
import { Conversation } from '@/features/conversations/conversation.types';
import { getUnreadCount, getOtherParticipantInConversation } from '../../conversations/utils/conversationUtils';
import { ConversationParticipant } from '@/features/conversations/conversation.types';
import IcebreakerHome from '@/app/icebreaker/page';
import { IcebreakerService } from '@/features/icebreakers/services/icebreakerService';


const initialState: ChatState = {
  messages: {},
  conversations: {},
  activeConversationId: null,
  error: null,
  currentQuestionGroup: null,
};


export const useChatStore = create<ChatStore>()(
  devtools(
    (set, get) => ({
      ...initialState,
      
      // Connection actions
      
      setActiveConversation: (conversationId: string | null) =>
        set({ activeConversationId: conversationId }),
      
      setError: (error: string | null) =>
        set({ error }),
      
      // Message actions
      addMessage: (conversationId: string, message: Message) =>
        set((state) => {
        const conversationMessages = state.messages[conversationId] || [];
        const conversation = state.conversations[conversationId];
        
        // ✅ Cas où la conversation n'existe pas encore (ex: premier message reçu)
        if (!conversation) {
          return {
            ...state,
            messages: {
              ...state.messages,
              [conversationId]: [...conversationMessages, message],
            },
          };
        }
        
        return {
          messages: {
            ...state.messages,
            [conversationId]: [...conversationMessages, message],
          },
          conversations: {
            ...state.conversations,
            [conversationId]: {
              ...conversation,
              lastMessage: message,
              unreadCount: getUnreadCount(conversation, message.senderId),
                        },
          },
        };
      }),
      
      // Update message status : sent / delivered / read
      updateMessageStatus: (conversationId: string, messageId: string, status: MessageStatus) =>
        set((state) => {
        const conversationMessages = state.messages[conversationId];
        if (!conversationMessages) return state;
        
        const updatedMessages = conversationMessages.map((msg) =>
          msg.id === messageId ? { ...msg, status } : msg
      );
      
      return {
        messages: {
          ...state.messages,
          [conversationId]: updatedMessages,
        },
      };
    }),
    
    markMessagesAsRead: (conversationId: string) =>
      set((state) => {
      const conversation = state.conversations[conversationId];
      if (!conversation) return state;
      
      const messages = state.messages[conversationId] || [];
      const updatedMessages = messages.map((msg) => ({
        ...msg,
        status: msg.status === 'sent' ? 'read' as MessageStatus : msg.status,
      }));
      
      return {
        messages: {
          ...state.messages,
          [conversationId]: updatedMessages,
        },
        conversations: {
          ...state.conversations,
          [conversationId]: {
            ...conversation,
            unreadCount: 0,
          },
        },
      };
    }),
    
    // Conversation actions
    updateConversation: (conversationId: string, updates: Partial<Conversation>) =>
      set((state) => {
      const conversation = state.conversations[conversationId];
      if (!conversation) return state;
      
      return {
        conversations: {
          ...state.conversations,
          [conversationId]: {
            ...conversation,
            ...updates,
          },
        },
      };
    }),
    
    // Update participant field : isIcebreakerReady, hasGivenAnswer, isTyping
    updateParticipantField: (
      conversationId: string,
      participantId: string,
      field: 'isIcebreakerReady' | 'hasGivenAnswer' | 'isTyping',
      value: boolean
    ) => set((state) => {
      const conversation = state.conversations[conversationId];
      if (!conversation) return state;
      
      const updatedParticipants = conversation.participants?.map((p) =>
        p.userId === participantId ? { ...p, [field]: value } : p
    ) ?? [];
    
    return {
      ...state,
      conversations: {
        ...state.conversations,
        [conversationId]: {
          ...conversation,
          participants: updatedParticipants,
        },
      },
    };
  }),
  

  
  setCurrentQuestionGroup: (conversationId: string, questionGroup: string) =>
    set((state) => {
    const conversation = state.conversations[conversationId];
    if (!conversation) return state;
    
    return {
      conversations: {
        ...state.conversations,
        [conversationId]: {
          ...conversation,
          currentQuestionGroup: questionGroup
        },
      },
    };
  }),
  
  getCurrentQuestionGroup: (conversationId: string) => {
    return get().conversations[conversationId]?.currentQuestionGroup;
  },
  
  
  resetIcebreakerStatus: (conversationId: string) =>
    set((state: ChatState) => {
      const conversation = state.conversations[conversationId];
      if (!conversation) return state;

      // Réinitialiser le statut de l'icebreaker
      get().updateParticipantField(conversationId, conversation.participants[0].userId, 'isIcebreakerReady', false);
      get().updateParticipantField(conversationId, conversation.participants[1].userId, 'isIcebreakerReady', false);
      get().updateParticipantField(conversationId, conversation.participants[0].userId, 'hasGivenAnswer', false);
      get().updateParticipantField(conversationId, conversation.participants[1].userId, 'hasGivenAnswer', false);
      get().updateConversation(conversationId, {currentQuestionGroup: undefined});
      
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [conversationId]: {
            ...conversation,
            currentQuestionGroup: undefined
          }
        }
      };
    }),
  
  
  initializeConversation: (conversation: Conversation) =>
    set((state) => ({
    conversations: {
      ...state.conversations,
      [conversation.id]: conversation,
    },
    messages: {
      ...state.messages,
      [conversation.id]: conversation.messages || [],
    },
  })),
  
  getParticipant: (conversationId: string, userId: string) => {
    const conversation = get().conversations[conversationId];
    return conversation?.participants.find(participant => participant.userId === userId);
  },
  
  getOtherParticipant: (conversationId: string, userId: string) => {
    const conversation = get().conversations[conversationId];
    return conversation?.participants.find(participant => participant.userId !== userId);
  },
  
  getOtherParticipantId: (conversationId: string, userId: string) => {
    const conversation = get().conversations[conversationId];
    return conversation?.participants.find(participant => participant.userId !== userId)?.userId;
  },
  
  getOtherParticipantIcebreakerStatus: (conversationId: string, userId: string) => {
    const conversation = get().conversations[conversationId];
    if (!conversation) return undefined;
    // Trouver l'autre participant
    const otherParticipant = conversation.participants.find(participant => participant.userId !== userId);
    return otherParticipant?.isIcebreakerReady;
  },
  
  getConversation: (conversationId: string) => {
    return get().conversations[conversationId];
  },
  
  // Ajouter fonction pour mettre à jour la réponse d'un participant
  setParticipantResponse: (
    conversationId: string,
    participantId: string,
    response: {
      questionGroupId: string;
      optionId: string;
      answeredAt: string;
    } | null
  ) => set((state: ChatState) => {
    const conversation = state.conversations[conversationId];
    if (!conversation) return state;
    
    const updatedParticipants = conversation.participants?.map((p) =>
      p.userId === participantId ? { ...p, response, hasGivenAnswer: !!response } : p
    ) ?? [];

    return {
      ...state,
      conversations: {
        ...state.conversations,
        [conversationId]: {
          ...conversation,
          participants: updatedParticipants,
        },
      },
    };
  }),
  
  getParticipantResponse: (conversationId: string, participantId: string) => {
    const conversation = get().conversations[conversationId];
    if (!conversation) return null;
    
    const participant = conversation.participants.find(p => p.userId === participantId);
    return participant?.response || null;
  },
  
}),
{ name: 'chat-store' }
)
); 