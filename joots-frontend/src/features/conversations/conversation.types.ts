import { Message } from "@/features/chat/chat.types";
import { User } from "../user/user.types";


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