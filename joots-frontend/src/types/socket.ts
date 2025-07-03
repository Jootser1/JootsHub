import { Message } from '@shared/message.types'
import { IcebreakerResponse } from '@shared/icebreaker-event.types'
// Events envoyés au serveur
export interface ClientToServerEvents {
  joinConversation: (conversationId: string) => void
  leaveConversation: (conversationId: string) => void
  sendMessage: (data: { conversationId: string; content: string; userId: string }) => void
  messageReceived: (data: { messageId: string; conversationId: string }) => void
  messageRead: (data: { messageId: string; conversationId: string }) => void
  typing: (data: { conversation_id: string; user_id: string; is_typing: boolean }) => void
  icebreakerReady: (conversationId: string) => void
  icebreakerResponse: (data: { conversationId: string; response: IcebreakerResponse }) => void
}

// Events reçus du serveur
export interface ServerToClientEvents {
  connect: () => void
  disconnect: () => void
  error: (error: { message: string }) => void
  newMessage: (message: Message) => void
  messageStatus: (data: { message_id: string; status: 'delivered' | 'read' }) => void
  participantOnline: (data: { participant_id: string; is_online: boolean }) => void
  typing: (data: { conversation_id: string; user_id: string; is_typing: boolean }) => void
  icebreakerQuestion: (data: { conversation_id: string; question: string }) => void
  icebreakerParticipantReady: (data: { conversation_id: string; participant_id: string }) => void
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

export interface SocketMessage {
  message_id: string
  content: string
  sender_id: string
  receiver_id: string
  created_at: string
  is_read: boolean
}





