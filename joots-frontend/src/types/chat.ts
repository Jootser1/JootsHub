import { User } from './user';

export type MessageStatus = 'sent' | 'delivered' | 'read';
export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';
export type IcebreakerResponse = 'oui' | 'non' | 'je ne sais pas';
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

export interface ConversationParticipant {
  conversationId: string;
  userId: string;
  user: User;
}

export interface Conversation {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  participants: ConversationParticipant[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
  icebreakerStatus: {
    senderReady: boolean;
    receiverReady: boolean;
    currentQuestion?: string;
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

  // Icebreaker actions
  setIcebreakerReady: (conversationId: string, isCurrentUser: boolean) => void;
  setIcebreakerQuestion: (conversationId: string, question: string) => void;
  submitIcebreakerResponse: (
    conversationId: string, 
    isCurrentUser: boolean, 
    response: IcebreakerResponse
  ) => void;
  resetIcebreakerStatus: (conversationId: string) => void;
}

export type ChatStore = ChatState & ChatActions; 