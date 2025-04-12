'use client';

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSocket } from '@/app/sockets/useSocket';
import { useChatStore } from '@/stores/chatStore';
import { useContactStore } from '@/stores/contactStore';
import axiosInstance from '@/app/api/axiosInstance';
import { logger } from '@/utils/logger';
import { ChatSocketService } from './chatSocketService';
import { Conversation } from '@/types/chat';
import { getOtherParticipant } from '@/utils/conversationUtils';

interface ChatSocketContextType {
    socketService: ChatSocketService | null;
    isConnected: boolean;
    isLoading: boolean;
}

interface ChatSocketProviderProps {
    children: ReactNode;
    conversation?: Conversation | null;
}

export const ChatSocketContext = createContext<ChatSocketContextType | null>(null);

export const ChatSocketProvider = ({ children, conversation }: ChatSocketProviderProps) => {
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState(true);
    const { isConnected } = useSocket('chat');
    const [eventsRegistered, setEventsRegistered] = useState(false);
    const socketService = ChatSocketService.getInstance();
    
    useEffect(() => {
        const setupSocket = async () => {
            if (status !== 'authenticated' || !isConnected || !session?.user?.id || !session.user.id || !conversation?.id) return;
            try {
                socketService.connect(session.user.id, session.accessToken);// Configuration du socket
                if (!eventsRegistered) {
                    socketService.registerEvents();
                    setEventsRegistered(true);
                }
                if (socketService.isConnected()) {
                    socketService.joinConversation(conversation.id);
                    logger.info('Conversation rejointe:', conversation.id);
                }
                setIsLoading(false);
            } catch (error) {
                logger.error("Erreur lors de la configuration du socket chat:", error);
                setIsLoading(false);
            }
        };
        
        setupSocket();
        
        return () => {
            if (eventsRegistered && conversation?.id) {
                socketService.leaveConversation(conversation.id);
                socketService.unregisterEvents();
                setEventsRegistered(false);
            }
        };
    }, [session?.user?.id, session?.accessToken, isConnected, status]);
    
    return (
        <ChatSocketContext.Provider value={{ socketService, isConnected, isLoading }}>
        {children}
        </ChatSocketContext.Provider>
    );
};

export const useChatSocketContext = () => {
    const context = useContext(ChatSocketContext);
    if (!context) {
        throw new Error('useChatSocketContext must be used within a ChatSocketProvider');
    }
    return context;
}; 