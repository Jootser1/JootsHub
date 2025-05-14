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
            logger.info(`(Re)Connexion socket chat ${success ? 'réussie' : 'échouée'}`);         
        };
        
        setupChatSocket();
        
        // Pas de nettoyage spécifique ici - géré par GlobalUserSocketProvider
    }, [
        session?.user?.id, 
        session?.accessToken, 
        status,
        socketMan.isChatConnected
    ]);
    
    // Rendre simplement les enfants
    return <>{children}</>;
}; 