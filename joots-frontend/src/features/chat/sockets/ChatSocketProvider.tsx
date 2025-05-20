'use client';

import { ReactNode, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { logger } from '@/utils/logger';
import { useSocketManager } from '@/hooks/useSocketManager';


interface ChatSocketProviderProps {
    children: ReactNode;
}

//Composant qui établit et maintient une connexion socket chat pour l'utilisateur connecté
export const ChatSocketProvider = ({ children }: ChatSocketProviderProps) => {
    const { data: session, status } = useSession();
    const socketMan = useSocketManager();
    
    // Fonction mémorisée pour connecter le socket chat
    const connectChat = useCallback(async (userId: string, token: string): Promise<boolean> => {
        try {
            await socketMan.connectWithAllUserConversations(userId, token);
            return true;
        } catch (error) {
            logger.error('Erreur lors de la connexion au socket chat', error as Error);
            return false;
        }
    }, [socketMan]);
    
    // Effet principal pour établir la connexion socket
    useEffect(() => {
        const setupChatSocket = async () => {
            // Conditions préalables non remplies
            if (status !== 'authenticated' || !session?.user?.id) {
                return;
            }
            
            const success = await connectChat(session.user.id, session.accessToken);
        };
        
        setupChatSocket();
        
        // Pas de nettoyage spécifique ici - géré par GlobalUserSocketProvider
    }, [
        session?.user?.id, 
        session?.accessToken, 
        status,
        socketMan.isChatConnected,
    ]);
    
    // Rendre simplement les enfants
    return <>{children}</>;
}; 