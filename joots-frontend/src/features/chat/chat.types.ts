import { User } from '@/features/user/user.types';
import { Conversation, ConversationParticipant } from '@/features/conversations/conversation.types';
import { IcebreakerResponse } from '@/features/icebreakers/icebreaker.types';

export type MessageStatus = 'sent' | 'delivered' | 'read';
export type MessageType = 'text' | 'icebreaker';

export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: Date;
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
  activeConversationId: string | null;
  currentQuestionGroup: string | null;
  error: string | null;
}

export type ChatActions = {
  // Connection actions
  setActiveConversation: (conversationId: string | null) => void;
  setError: (error: string | null) => void;

  // Message actions
  addMessage: (conversationId: string, message: Message) => void;
  updateMessageStatus: (conversationId: string, messageId: string, status: MessageStatus) => void;
  markMessagesAsRead: (conversationId: string) => void;
  initializeConversation: (conversation: Conversation) => void;
  fetchRandomQuestion: (conversationId: string) => void;

  // Conversation actions
  updateConversation: (conversationId: string, updates: Partial<Conversation>) => void;
  updateParticipantField: <K extends keyof ConversationParticipant>(
    conversationId: string,
    participantId: string,
    field: K,
    value: ConversationParticipant[K]
  ) => void;
  setParticipantResponse: (conversationId: string, participantId: string, response: IcebreakerResponse) => void;
  getParticipantResponse: (conversationId: string, participantId: string) => IcebreakerResponse | null;
  resetIcebreakerStatus: (conversationId: string) => void;
  getParticipant: (conversationId: string, userId: string) => ConversationParticipant | undefined;
  getOtherParticipant: (conversationId: string, userId: string) => ConversationParticipant | undefined;
  getOtherParticipantId: (conversationId: string, userId: string) => string | undefined;
  getCurrentQuestionGroup: (conversationId: string) => string | null;
  setCurrentQuestionGroup: (conversationId: string, questionGroup: string) => void;
}

export type ChatStore = ChatState & ChatActions; 