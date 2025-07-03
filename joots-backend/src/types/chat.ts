import { Message, MessageStatus } from '@shared/message.types';
import { Conversation } from '@shared/conversation.types';
import { ConversationParticipant } from '@shared/conversation.types';

export interface ChatState {
  messages: Record<string, Message[]>;
  conversations: Record<string, Conversation>;
  activeConversationId: string | null;
}

export type ContactState = {
  contacts: Record<string, ConversationParticipant>;
  contactIdsLoaded: boolean;
};

export type ChatActions = {
  setConversations: (conversations: Conversation[]) => void;
  setActiveConversationId: (conversationId: string | null) => void;
  setMessages: (conversationId: string, messages: Message[]) => void;
  addMessage: (conversationId: string, message: Message) => void;
  updateMessageStatus: (
    conversationId: string,
    messageId: string,
    status: MessageStatus
  ) => void;
  markMessagesAsRead: (conversationId: string) => void;
  updateConversation: (
    conversationId: string,
    updates: Partial<Conversation>
  ) => void;
};

export type ContactActions = {
  setParticipantOnlineStatus: (
    participantId: string,
    isOnline: boolean
  ) => void;
  setParticipantTypingStatus: (
    participantId: string,
    isTyping: boolean
  ) => void;
  setContacts: (contacts: ConversationParticipant[]) => void;
  addContact: (contact: ConversationParticipant) => void;
  removeContact: (userId: string) => void;
  isContact: (userId: string) => boolean;
  loadContacts: () => Promise<void>;
  syncContact: (userId: string, add: boolean) => Promise<void>;
};

export type ChatStore = ChatState & ChatActions & ContactActions & ContactState;
