import { Conversation } from '@/features/conversations/conversation.types';
import { User } from '@/features/user/user.types';
import { useContactStore } from '@/features/contacts/stores/contactStore';

export const getOtherParticipantInConversation = (conversation: Conversation, currentUserId: string): User | undefined => {
  const otherParticipant = conversation.participants.find(p => p.userId !== currentUserId);
  if (!otherParticipant) return undefined;
  
  const contactStore = useContactStore.getState();
  const isUserOnline = contactStore.isUserOnline(otherParticipant.user.id);
  return { ...otherParticipant.user, isOnline: isUserOnline };
};

export const isCurrentUserSender = (message: { senderId: string }, currentUserId: string): boolean => {
  return message.senderId === currentUserId;
};

export const getUnreadCount = (conversation: Conversation, currentUserId: string): number => {
  return conversation.messages.filter(msg => 
    !isCurrentUserSender(msg, currentUserId) && msg.status !== 'read'
  ).length;
}; 