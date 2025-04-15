import { User } from '@/features/user/user.types';
import { Conversation } from '@/features/conversations/conversation.types';
import { ConnectionStatus } from '@/features/contacts/contacts.types';
import { IcebreakerResponse } from '@/features/icebreakers/icebreaker.types';

export type MessageStatus = 'sent' | 'delivered' | 'read';
export type MessageType = 'text' | 'icebreaker';

export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  timestamp: Date;
  status: MessageStatus;
  type: MessageType;
  icebreakerData?: {
    question: string;
    senderResponse: IcebreakerResponse;
    receiverResponse: IcebreakerResponse;
  };
}

export interface ChatState {
  messages: Record<string, Message[]>;
  conversations: Record<string, Conversation>;
  connectionStatus: ConnectionStatus;
  activeConversationId: string | null;
  error: string | null;
}

export type ChatActions = {
  // Connection actions
  setConnectionStatus: (status: ConnectionStatus) => void;
  setActiveConversation: (conversationId: string | null) => void;
  setError: (error: string | null) => void;

  // Message actions
  addMessage: (conversationId: string, message: Message) => void;
  updateMessageStatus: (conversationId: string, messageId: string, status: MessageStatus) => void;
  markMessagesAsRead: (conversationId: string) => void;

  // Conversation actions
  updateConversation: (conversationId: string, updates: Partial<Conversation>) => void;
  setParticipantOnlineStatus: (participantId: string, isOnline: boolean) => void;
  setParticipantTypingStatus: (participantId: string, isTyping: boolean) => void; 
}

export type ChatStore = ChatState & ChatActions; 