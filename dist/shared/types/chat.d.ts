import { User } from './user';
export declare type MessageStatus = 'sent' | 'delivered' | 'read';
export declare type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';
export declare type MessageType = 'text' | 'icebreaker';
export interface Message {
    id: string;
    content: string;
    senderId: string;
    receiverId: string;
    timestamp: Date;
    status: MessageStatus;
    type: MessageType;
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
    activeConversationId: string | null;
}
export declare type ContactState = {
    contacts: Record<string, ConversationParticipant>;
    contactIdsLoaded: boolean;
};
export declare type ChatActions = {
    setConversations: (conversations: Conversation[]) => void;
    setActiveConversationId: (conversationId: string | null) => void;
    setMessages: (conversationId: string, messages: Message[]) => void;
    addMessage: (conversationId: string, message: Message) => void;
    updateMessageStatus: (conversationId: string, messageId: string, status: MessageStatus) => void;
    markMessagesAsRead: (conversationId: string) => void;
    updateConversation: (conversationId: string, updates: Partial<Conversation>) => void;
};
export declare type ContactActions = {
    setParticipantOnlineStatus: (participantId: string, isOnline: boolean) => void;
    setParticipantTypingStatus: (participantId: string, isTyping: boolean) => void;
    setContacts: (contacts: ConversationParticipant[]) => void;
    addContact: (contact: ConversationParticipant) => void;
    removeContact: (userId: string) => void;
    isContact: (userId: string) => boolean;
    loadContacts: () => Promise<void>;
    syncContact: (userId: string, add: boolean) => Promise<void>;
};
export declare type ChatStore = ChatState & ChatActions & ContactActions & ContactState;
