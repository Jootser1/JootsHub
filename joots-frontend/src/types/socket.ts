import { Message } from '@/features/chat/chat.types'
import { IcebreakerResponse } from '@/features/icebreakers/icebreaker.types'
// Events envoyés au serveur
export interface ClientToServerEvents {
  joinConversation: (conversationId: string) => void
  leaveConversation: (conversationId: string) => void
  sendMessage: (data: { conversationId: string; content: string; userId: string }) => void
  messageReceived: (data: { messageId: string; conversationId: string }) => void
  messageRead: (data: { messageId: string; conversationId: string }) => void
  typing: (data: { conversationId: string; userId: string; isTyping: boolean }) => void
  icebreakerReady: (conversationId: string) => void
  icebreakerResponse: (data: { conversationId: string; response: IcebreakerResponse }) => void
}

// Events reçus du serveur
export interface ServerToClientEvents {
  connect: () => void
  disconnect: () => void
  error: (error: { message: string }) => void
  newMessage: (message: Message) => void
  messageStatus: (data: { messageId: string; status: 'delivered' | 'read' }) => void
  participantOnline: (data: { participantId: string; isOnline: boolean }) => void
  typing: (data: { conversationId: string; userId: string; isTyping: boolean }) => void
  icebreakerQuestion: (data: { conversationId: string; question: string }) => void
  icebreakerParticipantReady: (data: { conversationId: string; participantId: string }) => void
}

export interface SocketConfig {
  url: string
  options: {
    auth: {
      userId: string
      token: string
    }
    reconnection: boolean
    reconnectionAttempts: number
    reconnectionDelay: number
    reconnectionDelayMax: number
    timeout: number
    transports: string[]
  }
}

export interface UserStatusChange {
  userId: string
  isOnline: boolean
  timestamp?: string
  username?: string
  avatar?: string
  eventType?: 'connection' | 'disconnection'
  reason?: string
  error?: boolean
}

export interface SocketMessage {
  id: string
  content: string
  senderId: string
  receiverId: string
  createdAt: string
  isRead: boolean
}

export interface TypingStatus {
  conversationId: string
  userId: string
  isTyping: boolean
}
