export type MessageStatus = 'SENT' | 'DELIVERED' | 'READ' | 'DELETED'
export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';
export type MessageType = 'ICEBREAKER' | 'MESSAGE' | 'SYSTEM' ;


export interface Message {
  message_id: string
  sender_id: string
  content: string
  created_at: Date 
  status: MessageStatus
}

export interface ChatStoreMessage {
  message_id: string
  message_type: MessageType
  sender_id: string
  content: string
  userAId?: string
  userAAnswer?: string
  userBId?: string
  userBAnswer?: string
  created_at: Date 
  status: MessageStatus
}





