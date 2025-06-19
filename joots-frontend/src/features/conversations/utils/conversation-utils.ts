import { Conversation } from '@shared/conversation.types'
import { User } from '@shared/user.types'

export const getOtherParticipantInConversation = (
  conversation: Conversation,
  currentUserId: string
): User | undefined => {
  if (!conversation?.participants || !currentUserId) {
    return undefined
  }
  const otherParticipant = conversation.participants.find(p => {
    const participantId = (p as any).user_id ?? p.user?.user_id
    return participantId && participantId !== currentUserId
  })
  if (!otherParticipant) return undefined

  return otherParticipant.user
}

export const isCurrentUserSender = (
  message: { senderId: string },
  currentUserId: string
): boolean => {
  return message.senderId === currentUserId
}

export const getUnreadCount = (conversation: Conversation, currentUserId: string): number => {
  if (!conversation.messages) return 0
  return conversation.messages.filter(
    message => message.status !== 'read' && message.sender_id !== currentUserId
  ).length
}
