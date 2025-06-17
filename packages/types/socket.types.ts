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