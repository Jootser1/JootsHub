import { Conversation, ConversationParticipant } from '@/features/conversations/conversation.types';
import { User } from '@/features/user/user.types';

export const getOtherParticipant = (conversation: Conversation, currentUserId: string): User | undefined => {
  return conversation.participants.find(p => p.userId !== currentUserId)?.user;
};

export const isCurrentUserSender = (message: { senderId: string }, currentUserId: string): boolean => {
  return message.senderId === currentUserId;
};

export const getUnreadCount = (conversation: Conversation, currentUserId: string): number => {
  return conversation.messages.filter(msg => 
    !isCurrentUserSender(msg, currentUserId) && msg.status !== 'read'
  ).length;
}; 