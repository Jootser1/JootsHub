export interface Message {
    id: string
    content: string
    senderId: string
    createdAt: string
    type?: 'question' | 'normal'
    answers?: {
      user1: 'oui' | 'non' | 'je ne sais pas'
      user2: 'oui' | 'non' | 'je ne sais pas'
    }
  }
  
  export interface User {
    id: string
    username: string
    avatar: string
    isOnline: boolean
  }
  
  export interface Conversation {
    id: string
    initiator: User
    receiver: User
    messages: Message[]
    updatedAt: string
  }
  
  export interface OnlineStatus {
    userId: string
    isOnline: boolean
  }