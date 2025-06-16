import { Conversation } from '@shared/conversation.types'
import { User } from '@shared/user.types'
import { useContactStore } from '@/features/contacts/stores/contact-store'
import { logger } from '@/utils/logger'

export const getOtherParticipantInConversation = (
  conversation: Conversation,
  currentUserId: string
): User | undefined => {
  if (!conversation?.participants || !currentUserId) {
    return undefined
  }
  logger.debug('getOtherParticipantInConversation', { conversation, currentUserId })
  const otherParticipant = conversation.participants.find((p: { user_id: string }) => p.user_id !== currentUserId)
  if (!otherParticipant) return undefined
  logger.debug('getOtherParticipantInConversation - Other participant', { otherParticipant })

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
