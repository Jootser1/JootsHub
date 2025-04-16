import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Message, ChatState, ChatStore, MessageStatus} from '@/features/chat/chat.types'; 
import { IcebreakerResponse } from '@/features/icebreakers/icebreaker.types';
import { Conversation } from '@/features/conversations/conversation.types';
import { ConnectionStatus } from '@/features/contacts/contacts.types';
import { getOtherParticipant, isCurrentUserSender, getUnreadCount } from '../../conversations/utils/conversationUtils';
import { ensureDate } from '@/utils/dateUtils';

const initialState: ChatState = {
  messages: {},
  conversations: {},
  connectionStatus: 'disconnected',
  activeConversationId: null,
  error: null,
};

const defaultIcebreakerStatus = {
  senderReady: false,
  receiverReady: false,
  currentQuestion: undefined,
};


export const useChatStore = create<ChatStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      // Connection actions
      setConnectionStatus: (status: ConnectionStatus) =>
        set({ connectionStatus: status }),

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
                icebreakerStatus: conversation.icebreakerStatus || defaultIcebreakerStatus,
              },
            },
          };
        }),

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
                icebreakerStatus: conversation.icebreakerStatus || defaultIcebreakerStatus,
              },
            },
          };
        }),

      setParticipantOnlineStatus: (participantId: string, isOnline: boolean) =>
        set((state) => {
          const updatedConversations = { ...state.conversations };
          
          Object.entries(updatedConversations).forEach(([id, conversation]) => {
            const participant = conversation.participants.find(p => p.userId === participantId);
            if (participant) {
              updatedConversations[id] = {
                ...conversation,
                participants: conversation.participants.map(p => 
                  p.userId === participantId ? { ...p, isOnline } : p
                ),
              };
            }
          });

          return { conversations: updatedConversations };
        }),

      setParticipantTypingStatus: (participantId: string, isTyping: boolean) =>
        set((state) => {
          const updatedConversations = { ...state.conversations };
          
          Object.entries(updatedConversations).forEach(([id, conversation]) => {
            const participant = conversation.participants.find(p => p.userId === participantId);
            if (participant) {
              updatedConversations[id] = {
                ...conversation,
                participants: conversation.participants.map(p => 
                  p.userId === participantId ? { ...p, isTyping } : p
                ),
              };
            }
          });

          return { conversations: updatedConversations };
        }),

      // Icebreaker actions
      setIcebreakerReady: (conversationId: string, isCurrentUser: boolean) =>
        set((state) => {
          const conversation = state.conversations[conversationId];
          if (!conversation) return state;

          const currentIcebreakerStatus = conversation.icebreakerStatus || defaultIcebreakerStatus;

          return {
            conversations: {
              ...state.conversations,
              [conversationId]: {
                ...conversation,
                icebreakerStatus: {
                  ...currentIcebreakerStatus,
                  senderReady: isCurrentUser ? true : currentIcebreakerStatus.senderReady,
                  receiverReady: !isCurrentUser ? true : currentIcebreakerStatus.receiverReady,
                },
              },
            },
          };
        }),

      setIcebreakerQuestion: (conversationId: string, question: string) =>
        set((state) => {
          const conversation = state.conversations[conversationId];
          if (!conversation) return state;

          const currentIcebreakerStatus = conversation.icebreakerStatus || defaultIcebreakerStatus;

          return {
            conversations: {
              ...state.conversations,
              [conversationId]: {
                ...conversation,
                icebreakerStatus: {
                  ...currentIcebreakerStatus,
                  currentQuestion: question,
                },
              },
            },
          };
        }),

      submitIcebreakerResponse: (conversationId: string, isCurrentUser: boolean, response: IcebreakerResponse
      ) =>
        set((state) => {
          const conversation = state.conversations[conversationId];
          if (!conversation || !conversation.icebreakerStatus.currentQuestion) return state;

          const otherParticipant = getOtherParticipant(conversation, conversation.participants[0].userId);
          if (!otherParticipant) return state;

          const newMessage: Message = {
            id: crypto.randomUUID(),
            content: conversation.icebreakerStatus.currentQuestion,
            senderId: isCurrentUser ? conversation.participants[0].userId : otherParticipant.id,
            receiverId: isCurrentUser ? otherParticipant.id : conversation.participants[0].userId,
            createdAt: new Date(),
            status: 'sent',
            type: 'icebreaker',
            icebreakerData: {
              question: conversation.icebreakerStatus.currentQuestion,
              senderResponse: isCurrentUser ? response : 'je ne sais pas',
              receiverResponse: !isCurrentUser ? response : 'je ne sais pas',
            },
          };

          return {
            messages: {
              ...state.messages,
              [conversationId]: [...(state.messages[conversationId] || []), newMessage],
            },
            conversations: {
              ...state.conversations,
              [conversationId]: {
                ...conversation,
                lastMessage: newMessage,
                icebreakerStatus: {
                  senderReady: false,
                  receiverReady: false,
                  currentQuestion: undefined,
                },
              },
            },
          };
        }),

      resetIcebreakerStatus: (conversationId: string) =>
        set((state) => {
          const conversation = state.conversations[conversationId];
          if (!conversation) return state;

          return {
            conversations: {
              ...state.conversations,
              [conversationId]: {
                ...conversation,
                icebreakerStatus: {
                  senderReady: false,
                  receiverReady: false,
                  currentQuestion: undefined,
                },
              },
            },
          };
        }),

      initializeConversationMessages: (conversationId: string, messages: Message[]) => {
        messages.forEach((message) => {
          const processedMessage = {
            ...message,
            createdAt: typeof message.createdAt === 'string' 
              ? ensureDate(message.createdAt) 
              : message.createdAt instanceof Date 
                ? message.createdAt 
                : new Date()
          };
          get().addMessage(conversationId, processedMessage);
        });
      },


    }),
    { name: 'chat-store' }
  )
); 