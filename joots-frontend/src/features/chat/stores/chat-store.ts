import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { Message, ChatState, ChatStore, MessageStatus, ProgressionResult } from '@/features/chat/chat.types'
import { Conversation } from '@/features/conversations/conversation.types'
import { getUnreadCount } from '../../conversations/utils/conversation-utils'
import axiosInstance from '@/app/api/axios-instance'
import { logger } from '@/utils/logger'

const initialState: ChatState = {
  conversations: {},
  activeConversationId: null,
  error: null,
  currentQuestionGroup: null,
  conversationsIds: [],
  icebreakerQuestions: {},
}

export const useChatStore = create<ChatStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // État de navigation
        setActiveConversation: (conversationId: string | null) =>
          set({ activeConversationId: conversationId }),

        setError: (error: string | null) => set({ error }),

        setConversationsIds: (conversationIds: string[]) => {
          set({ conversationsIds: conversationIds })
        },

        // Conversations
        loadAllConversations: async () => {
          try {
            logger.info('Début du chargement des conversations')
            const response = await axiosInstance.get('/conversations')
            set(state => {
              const newConversations = { ...state.conversations }

              response.data.forEach((conversation: Conversation) => {
                newConversations[conversation.id] = {
                  ...conversation,
                  messages: conversation.messages || [],
                };
              })

              return {
                conversations: newConversations,
              }
            })
            logger.info(
              `${response.data.length} conversation(s) récupérées depuis la bdd et syncstore`
            )
          } catch (error) {
            logger.error(
              'Erreur lors du chargement des conversations vers le ChatStore',
              error instanceof Error ? error : new Error(String(error))
            )
          }
        },

        updateConversation: (conversationId: string, updates: Partial<Conversation>) =>
          set(state => {
            const conversation = state.conversations[conversationId]
            if (!conversation) return state
            return {
              conversations: {
                ...state.conversations,
                [conversationId]: {
                  ...conversation,
                  ...updates,
                },
              },
            }
          }),

        initializeConversation: (conversation: Conversation) =>
          set(state => ({
            conversations: {
              ...state.conversations,
              [conversation.id]: {
                ...conversation,
                messages: conversation.messages || [],
              },
            },
          })),

        // Messages
        addMessage: (conversationId: string, message: Message) =>
          set(state => {
            logger.info(`Ajout d'un nouveau message dans la conversation ${conversationId}`);
            const conversation = state.conversations[conversationId];

            if (!conversation) {
              logger.warn(
                `Tentative d'ajout de message dans une conversation inexistante: ${conversationId}`
              );
              // Si la conversation n'existe pas, on ne peut pas y ajouter de message.
              // On pourrait choisir de créer une entrée messages à la racine ici,
              // mais pour la cohérence, il vaut mieux ne rien faire ou créer la conversation d'abord.
              // Pour l'instant, on retourne l'état inchangé si la conversation n'est pas trouvée.
              return state;
            }

            // Assurer que le tableau messages existe sur la conversation
            const existingMessages = conversation.messages || [];
            
            return {

              conversations: {
                ...state.conversations,
                [conversationId]: {
                  ...conversation,
                  messages: [...existingMessages, message], // Ajouter le message ici
                  lastMessage: message,
                  unreadCount: getUnreadCount(conversation, message.senderId),
                },
              },
            };
          }),

        updateMessageStatus: (conversationId: string, messageId: string, status: MessageStatus) =>
          set(state => {
            const conversation = state.conversations[conversationId];
            if (!conversation || !conversation.messages) return state;

            const updatedMessages = conversation.messages.map(msg =>
              msg.id === messageId ? { ...msg, status } : msg
            );
            return {
              conversations: {
                ...state.conversations,
                [conversationId]: {
                  ...conversation,
                  messages: updatedMessages,
                },
              },
            };
          }),

        markMessagesAsRead: (conversationId: string) =>
          set(state => {
            const conversation = state.conversations[conversationId];
            if (!conversation || !conversation.messages) return state;

            const updatedMessages = conversation.messages.map(msg => ({
              ...msg,
              status: msg.status === 'sent' ? ('read' as MessageStatus) : msg.status,
            }));
            return {
              conversations: {
                ...state.conversations,
                [conversationId]: {
                  ...conversation,
                  messages: updatedMessages,
                  unreadCount: 0,
                },
              },
            };
          }),

        getMessagesFromConversation: (conversationId: string) =>
          get().conversations[conversationId]?.messages || [],

        getConversation: (conversationId: string) => get().conversations[conversationId],

        getCurrentQuestionGroup: (conversationId: string) =>
          get().conversations[conversationId]?.currentQuestionGroup || null,

        setCurrentQuestionGroup: (conversationId: string, questionGroup: string) =>
          set(state => {
            const conversation = state.conversations[conversationId]
            if (!conversation) return state
            return {
              conversations: {
                ...state.conversations,
                [conversationId]: {
                  ...conversation,
                  currentQuestionGroup: questionGroup,
                },
              },
            }
          }),

        // Participants
        updateParticipantField: (
          conversationId: string,
          participantId: string,
          field: 'isIcebreakerReady' | 'hasGivenAnswer' | 'isTyping',
          value: boolean
        ) =>
          set(state => {
            const conversation = state.conversations[conversationId]
            if (!conversation) return state

            const updatedParticipants =
              conversation.participants?.map(p =>
                p.userId === participantId ? { ...p, [field]: value } : p
              ) ?? []

            return {
              conversations: {
                ...state.conversations,
                [conversationId]: {
                  ...conversation,
                  participants: updatedParticipants,
                },
              },
            }
          }),

        setParticipantResponse: (
          conversationId: string,
          participantId: string,
          response: {
            questionGroupId: string
            optionId: string
            answeredAt: string
          } | null
        ) =>
          set((state: ChatState) => {
            const conversation = state.conversations[conversationId]
            if (!conversation) return state

            const updatedParticipants =
              conversation.participants?.map(p =>
                p.userId === participantId ? { ...p, response, hasGivenAnswer: !!response } : p
              ) ?? []

            return {
              conversations: {
                ...state.conversations,
                [conversationId]: {
                  ...conversation,
                  participants: updatedParticipants,
                },
              },
            }
          }),

        resetIcebreakerStatus: (conversationId: string) =>
          set((state: ChatState) => {
            const conversation = state.conversations[conversationId]
            if (!conversation) return state

            const participants = conversation.participants
            if (!participants || participants.length < 2) return state

            const updatedParticipants = participants.map(p => ({
              ...p,
              isIcebreakerReady: false,
              hasGivenAnswer: false,
              response: null,
            }))

            return {
              conversations: {
                ...state.conversations,
                [conversationId]: {
                  ...conversation,
                  participants: updatedParticipants,
                  currentQuestionGroup: undefined,
                },
              },
            }
          }),

        getParticipant: (conversationId: string, userId: string) => {
          const conversation = get().conversations[conversationId]
          return conversation?.participants.find(p => p.userId === userId)
        },

        getOtherParticipant: (conversationId: string, userId: string) => {
          const conversation = get().conversations[conversationId]
          return conversation?.participants.find(p => p.userId !== userId)
        },

        getOtherParticipantId: (conversationId: string, userId: string) => {
          const conversation = get().conversations[conversationId]
          return conversation?.participants.find(p => p.userId !== userId)?.userId
        },

        getOtherParticipantIcebreakerStatus: (conversationId: string, userId: string) => {
          const conversation = get().conversations[conversationId]
          if (!conversation) return undefined
          const other = conversation.participants.find(p => p.userId !== userId)
          return other?.isIcebreakerReady
        },

        getParticipantResponse: (conversationId: string, participantId: string) => {
          const conversation = get().conversations[conversationId]
          const participant = conversation?.participants.find(p => p.userId === participantId)
          return participant?.response || null
        },


        updateConversationXpAndLevel: (conversationId: string, xpAndLevel: ProgressionResult) => {
          set(state => {
            const conversation = state.conversations[conversationId]
            if (!conversation) return state

            return {
              conversations: {
                ...state.conversations,
                [conversationId]: {
                  ...conversation,
                  xpAndLevel: {
                    ...xpAndLevel,
                  },
                },
              },
            }
          })
        },
      }),
      {
        name: 'chat-storage',
        partialize: state => {
          return {
            conversations: state.conversations,
            activeConversationId: state.activeConversationId,
            conversationsIds: state.conversationsIds,
          }
        },
        onRehydrateStorage: () => state => {
          if (state) {
            logger.info('Réhydratation du store - Début du rechargement des conversations')
            state.loadAllConversations()
          }
        },
      }
    )
  )
)
