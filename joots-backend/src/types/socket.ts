import { Message } from '@shared/message.types';

// Events envoyés au serveur
export interface ClientToServerEvents {
  joinConversation: (conversationId: string) => void;
  leaveConversation: (conversationId: string) => void;
  sendMessage: (data: {
    conversation_id: string;
    content: string;
    user_id: string;
  }) => void;
  messageReceived: (data: {
    message_id: string;
    conversation_id: string;
  }) => void;
  messageRead: (data: { message_id: string; conversation_id: string }) => void;
  typing: (data: {
    conversation_id: string;
    user_id: string;
    is_typing: boolean;
  }) => void;
  icebreakerReady: (conversation_id: string) => void;
}

// Events reçus du serveur
export interface ServerToClientEvents {
  connect: () => void;
  disconnect: () => void;
  error: (error: { message: string }) => void;
  newMessage: (message: Message) => void;
  messageStatus: (data: {
    message_id: string;
    status: 'delivered' | 'read';
  }) => void;
  participantOnline: (data: {
    participant_id: string;
    is_online: boolean;
  }) => void;
  typing: (data: {
    conversation_id: string;
    user_id: string;
    is_typing: boolean;
  }) => void;
  icebreakerQuestion: (data: {
    conversation_id: string;
    question: string;
  }) => void;
  icebreakerParticipantReady: (data: {
    conversation_id: string;
    participant_id: string;
  }) => void;
}

export interface SocketConfig {
  url: string;
  options: {
    auth: {
      userId: string;
      token: string;
    };
    reconnection: boolean;
    reconnectionAttempts: number;
    reconnectionDelay: number;
    reconnectionDelayMax: number;
    timeout: number;
    transports: string[];
  };
}

export interface UserStatusChange {
  user_id: string;
  is_online: boolean;
  timestamp?: string;
  username?: string;
  avatar?: string;
  eventType?: 'connection' | 'disconnection';
  reason?: string;
  error?: boolean;
}

export interface SocketMessage {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  is_read: boolean;
}

export interface TypingStatus {
  conversation_id: string;
  user_id: string;
  is_typing: boolean;
}
