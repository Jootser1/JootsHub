import { Conversation, ConversationParticipant } from '@/features/conversations/conversation.types'
import { IcebreakerResponse } from '@/features/icebreakers/icebreaker.types'
import { Question } from '@/features/questions/question.types'

export type MessageStatus = 'sent' | 'delivered' | 'read'
export type MessageType = 'TEXT' | 'ANSWER'

export interface Message {
  id: string
  content: string
  senderId: string
  receiverId: string
  createdAt: Date
  status: MessageStatus
  messageType: MessageType
  userAId?: string
  userAAnswer?: string
  userBId?: string
  userBAnswer?: string
}

export interface ChatState {
  messages: Record<string, Message[]>
  conversations: Record<string, Conversation>
  activeConversationId: string | null
  currentQuestionGroup: string | null
  error: string | null
  userId?: string
  token?: string
  conversationsIds: string[]
  icebreakerQuestions: Record<string, Question>
}

// Types exportés pour être utilisés dans chatEventHandlers.ts
export interface NewMessageEvent {
  id: string
  content: string
  sender?: { id: string }
  senderId?: string
  recipientId?: string
  type?: string
  createdAt?: string
  timestamp?: string
  conversationId: string
}

export interface TypingEvent {
  conversationId: string
  userId: string
  isTyping: boolean
}

export interface MessageReadEvent {
  conversationId: string
  messageId: string
}

export interface IcebreakerStatusEvent {
  conversationId: string
  userId: string
  isIcebreakerReady: boolean
  timestamp?: string
}

export interface IcebreakerQuestionGroupEvent {
  conversationId: string
  questionGroup: string
}

export interface IcebreakerResponsesEvent {
  id?: string
  conversationId: string
  questionLabel: string
  response1: string
  user1: string
  response2: string
  user2: string
}

export type ChatActions = {
  // Connection context
  setActiveConversation: (conversationId: string | null) => void
  setError: (error: string | null) => void

  // Conversation lifecycle
  loadAllConversations: () => Promise<void>
  updateConversation: (conversationId: string, updates: Partial<Conversation>) => void
  initializeConversation: (conversation: Conversation) => void

  // Message lifecycle
  addMessage: (conversationId: string, message: Message) => void
  updateMessageStatus: (conversationId: string, messageId: string, status: MessageStatus) => void
  markMessagesAsRead: (conversationId: string) => void

  // Participants
  updateParticipantField: (
    conversationId: string,
    participantId: string,
    field: 'isIcebreakerReady' | 'hasGivenAnswer' | 'isTyping',
    value: boolean
  ) => void

  // Icebreaker
  resetIcebreakerStatus: (conversationId: string) => void

  // Helpers
  getMessagesFromConversation: (conversationId: string) => Message[]
  getConversation: (conversationId: string) => Conversation | undefined
  getCurrentQuestionGroup: (conversationId: string) => string | null
  setCurrentQuestionGroup: (conversationId: string, questionGroup: string) => void
  getParticipant: (conversationId: string, userId: string) => ConversationParticipant | undefined
  getOtherParticipant: (
    conversationId: string,
    userId: string
  ) => ConversationParticipant | undefined
  getOtherParticipantId: (conversationId: string, userId: string) => string | undefined
  getOtherParticipantIcebreakerStatus: (
    conversationId: string,
    userId: string
  ) => boolean | undefined
  getParticipantResponse: (
    conversationId: string,
    participantId: string
  ) => IcebreakerResponse | null
  setParticipantResponse: (
    conversationId: string,
    participantId: string,
    response: IcebreakerResponse
  ) => void

  // Conversation actions
  setConversationsIds: (conversationIds: string[]) => void
}

export type ChatStore = ChatState & ChatActions
