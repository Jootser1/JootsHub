// src/features/chat/hooks/useConversationMessages.ts

import { useChatStore } from '@/features/chat/stores/chat-store'
import { Message } from '@/features/chat/chat.types'

export const useConversationMessages = (conversationId?: string): Message[] => {
  const allMessages = useChatStore(state => state.messages)
  return conversationId ? allMessages[conversationId] || [] : []
}
