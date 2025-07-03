import { ConversationWithCurrentPollObject } from '@/features/chat/chat.types'
import { Conversation, ConversationParticipant } from '@shared/conversation.types'
import { User } from '@shared/user.types'

export const getOtherParticipant = (
  conversation: ConversationWithCurrentPollObject,
  currentUserId: string
): ConversationParticipant | undefined => {
  if (!conversation?.participants || !currentUserId) {
    return undefined
  }
  
  // Vérifier d'abord que l'utilisateur actuel est présent dans la conversation
  const currentUserIsParticipant = conversation.participants.some(p => {
    const participantId = (p as any).user_id ?? p.user?.user_id
    return participantId === currentUserId
  })
  
  if (!currentUserIsParticipant) {
    console.warn(`L'utilisateur actuel (${currentUserId}) n'est pas présent dans la conversation ${conversation.conversation_id}`)
    return undefined
  }
  
  return conversation.participants.find(p => {
    const participantId = (p as any).user_id ?? p.user?.user_id
    return participantId && participantId !== currentUserId
  })
}

export const getOtherParticipantUser = (
  conversation: ConversationWithCurrentPollObject,
  currentUserId: string
): User | undefined => {
  const otherParticipant = getOtherParticipant(conversation, currentUserId)
  return otherParticipant?.user
}

export const isCurrentUserSender = (
  message: { senderId: string },
  currentUserId: string
): boolean => {
  return message.senderId === currentUserId
}

export const getUnreadCount = (conversation: ConversationWithCurrentPollObject, currentUserId: string): number => {
  if (!conversation.messages) return 0
  return conversation.messages.filter(
    message => message.status !== 'DELIVERED' && message.sender_id !== currentUserId
  ).length
}
