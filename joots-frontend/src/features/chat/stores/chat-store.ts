import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { ChatState, ChatStore, ConversationWithCurrentPollObject } from '@/features/chat/chat.types'
import { xp_and_level } from '@shared/conversation.types'
import { CurrentPollWithRelations } from '@shared/poll.types'
import { Conversation, ConversationParticipant } from '@shared/conversation.types'
import { Message } from '@shared/message.types'
import { MessageStatus } from '@shared/message.types'
import { getUnreadCount, getOtherParticipant } from '../../conversations/utils/conversation-utils'
import axiosInstance from '@/app/api/axios-instance'
import { logger } from '@/utils/logger'
import { IcebreakerResponse } from '@shared/icebreaker-event.types'
import { ChatStoreMessage } from '@shared/message.types'

const initialState: ChatState = {
  conversations: {},
  activeConversationId: null,
  error: null,
  currentPoll: null,
  conversationsIds: [],
  icebreakerQuestions: {},
  isChatSocketConnected: false,
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
            const response = await axiosInstance.get('/conversations')
            
            set((state: ChatStore) => {
              // load conversations and remove obsolete ones in the chat store
              const newConversations: Record<string, ConversationWithCurrentPollObject> = {}

              response.data.forEach((conversation: ConversationWithCurrentPollObject) => {
                const formattedParticipants = conversation.participants.map(p => ({
                  ...p,
                  user_id: (p as any).user_id ?? p.user?.user_id
                }))
                newConversations[conversation.conversation_id] = {
                  ...conversation,
                  participants: formattedParticipants,
                  messages: conversation.messages || [],
                };
              })

              return {
                conversations: newConversations,
              }
            })
            logger.info(`[Chat Store] Filled with ${response.data.length} actual conversations with Participants and Last Message`)
          } catch (error) {
            logger.error(
              'Erreur lors du chargement des conversations vers le ChatStore',
              error instanceof Error ? error : new Error(String(error))
            )
          }
        },

        updateConversation: (conversationId: string, updates: Partial<ConversationWithCurrentPollObject>) =>
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

        initializeConversation: (conversation: ConversationWithCurrentPollObject) =>
          set(state => {
            const existingConversation = state.conversations[conversation.conversation_id];
            if (existingConversation) {
              return state; // Ne pas réinitialiser si la conversation existe déjà
            }
            return {
              conversations: {
                ...state.conversations,
                [conversation.conversation_id]: {
                  ...conversation,
                  messages: conversation.messages || [],
                },
              },
            };
          }),

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
                  unreadCount: getUnreadCount(conversation, message.sender_id),
                },
              },
            };
          }),

        updateMessageStatus: (conversationId: string, messageId: string, status: MessageStatus) =>
          set(state => {
            const conversation = state.conversations[conversationId];
            if (!conversation || !conversation.messages) return state;

            const updatedMessages = conversation.messages.map((msg: Message) =>
              msg.message_id === messageId ? { ...msg, status } : msg
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

            const updatedMessages = conversation.messages.map((msg: Message) => ({
              ...msg,
              status: msg.status === 'SENT' ? ('READ' as MessageStatus) : msg.status,
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

        getMessagesFromConversation: (conversationId: string) => {
          const rawMessages = get().conversations[conversationId]?.messages || []
          // Assure une sortie conforme à ChatStoreMessage
          return rawMessages.map((msg: any) => ({
            message_type: msg.message_type ?? 'MESSAGE',
            ...msg,
          })) as unknown as ChatStoreMessage[]
        },

        getConversation: (conversationId: string) => get().conversations[conversationId],

        getCurrentPoll: (conversationId: string) =>
          get().conversations[conversationId]?.current_poll || null,

        setCurrentPoll: (conversationId: string, poll: CurrentPollWithRelations) =>
          set(state => {
            const conversation = state.conversations[conversationId]
            if (!conversation) return state
            return {
              conversations: {
                ...state.conversations,
                [conversationId]: {
                  ...conversation,
                  current_poll: poll,
                },
              },
            }
          }),

        // Participants
        updateParticipantField: (
          conversationId: string,
          participantId: string,
          field: 'is_icebreaker_ready' | 'has_given_answer' | 'is_typing',
          value: boolean
        ) =>
          set(state => {
            const conversation = state.conversations[conversationId]
            if (!conversation) return state

            const updatedParticipants =
              conversation.participants?.map((p: ConversationParticipant) =>
                p.user_id === participantId ? { ...p, [field]: value } : p
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
          response: IcebreakerResponse | null
        ) =>
          set(state => {
            const conversation = state.conversations[conversationId]
            if (!conversation) return state

            const transformedResponse = response
              ? {
                  poll_id: response.pollId,
                  option_id: response.optionId,
                  answered_at: response.answeredAt,
                }
              : null

            const updatedParticipants =
              conversation.participants?.map((p: ConversationParticipant) =>
                p.user_id === participantId
                  ? { ...p, response: transformedResponse, has_given_answer: !!response }
                  : p
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
          set(state => {
            const conversation = state.conversations[conversationId]
            if (!conversation) return state

            const participants = conversation.participants
            if (!participants || participants.length < 2) return state

            const updatedParticipants = participants.map((p: ConversationParticipant) => ({
              ...p,
              is_icebreaker_ready: false,
              has_given_answer: false,
              response: null,
            }))

            return {
              conversations: {
                ...state.conversations,
                [conversationId]: {
                  ...conversation,
                  participants: updatedParticipants,
                  current_poll: null,
                },
              },
            }
          }),

        getParticipant: (conversationId: string, userId: string) => {
          const conversation = get().conversations[conversationId]
          return conversation?.participants.find((p: ConversationParticipant) => p.user_id === userId)
        },

        getOtherParticipant: (conversationId: string, userId: string) => {
          const conversation = get().conversations[conversationId]
          return getOtherParticipant(conversation, userId)
        },

        getOtherParticipantId: (conversationId: string, userId: string) => {
          const state = get();
          const conversation = state.conversations ? state.conversations[conversationId] : undefined;
          return conversation ? getOtherParticipant(conversation, userId)?.user_id : undefined;
        },

        getOtherParticipantIcebreakerStatus: (conversationId: string, userId: string) => {
          const conversation = get().conversations[conversationId]
          if (!conversation) return undefined
          const other = conversation.participants.find((p: ConversationParticipant) => p.user_id !== userId)
          return other?.is_icebreaker_ready
        },

        getParticipantResponse: (conversationId: string, participantId: string) => {
          const conversation = get().conversations[conversationId]
          const participant = conversation?.participants.find((p: ConversationParticipant) => p.user_id === participantId)
          const resp = participant?.response || null
          if (!resp) return null
          return {
            pollId: (resp as any).poll_id,
            optionId: (resp as any).option_id,
            answeredAt: (resp as any).answered_at,
          } as IcebreakerResponse
        },

        updateConversationXpAndLevel: (conversationId: string, xpAndLevel: xp_and_level) => {
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
