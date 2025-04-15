'use client';

import { createContext, useContext, ReactNode, useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { logger } from '@/utils/logger';
import { Conversation } from '@/features/conversations/conversation.types';
import { useChatSocketStore } from '@/features/chat/stores/chatSocketStore';
import { ChatSocketService } from '@/features/chat/sockets/chatSocketService';

interface ChatSocketContextType {
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
    const [isConnected, setIsConnected] = useState(false);
    const connectionAttempted = useRef(false);

    useEffect(() => {
        const setupChatSocket = async () => {
            if (status !== 'authenticated' || !session?.user?.id || !conversation?.id || connectionAttempted.current === true) {
                logger.info('Not authenticated, no conversation ID or connection already attempted');
                setIsLoading(false);
                return;
            }
            
            connectionAttempted.current = true;
            
            try {
                // Utiliser le socketStore pour gérer la connexion
                const chatSocket = await useChatSocketStore.getState().connectChatSocket(
                    session.user.id, 
                    session.accessToken,
                    conversation.id
                );
                
                // Vérifier si la connexion a réussi
                if (chatSocket.isConnected()) {
                    setIsConnected(true);
                    logger.info(`Socket chat connecté pour la conversation: ${conversation.id}`);
                } else {
                    logger.warn(`Échec de connexion du socket chat pour la conversation: ${conversation.id}`);
                }
                
                setIsLoading(false);
            } catch (error) {
                console.log('Step 3');
                logger.error("Erreur lors de la configuration du socket chat:", error);
                setIsLoading(false);
                connectionAttempted.current = false;
            }
        };
        
        setupChatSocket();
        
        // Cleanup à la déconnexion
        return () => {
            const chatSocket = useChatSocketStore.getState().chatSocket as ChatSocketService;
            if (chatSocket && conversation?.id) {
              chatSocket.leaveConversation(conversation.id);
              chatSocket.unregisterEvents();
              logger.info(`Nettoyage des événements pour la conversation: ${conversation.id}`);
            }
          };
    }, [session?.user?.id, session?.accessToken, status, conversation?.id]);
    
    return (
        <ChatSocketContext.Provider value={{ 
            isConnected, 
            isLoading
        }}>
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