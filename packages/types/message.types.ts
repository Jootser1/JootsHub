
export type MessageStatus = 'sent' | 'delivered' | 'read'
export type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';


export interface Message {
  message_id: string
  sender_id: string
  content: string
  created_at: Date 
  receiver_id?: string 
  status: MessageStatus
}





