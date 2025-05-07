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
    const socketManager = useSocketManager();

    // Fonction mémorisée pour connecter le socket chat
    const connectChat = useCallback(async (userId: string, token: string) => {
        try {
            await socketManager.connectWithAllUserConversations(userId, token);
        } catch (error) {
            logger.error("Erreur lors de l'initialisation du socket chat:", error);
        }
    }, [socketManager]);

    // Effet principal pour établir la connexion socket
    useEffect(() => {
        const setupChatSocket = async () => {
            // Conditions préalables non remplies
            if (status !== 'authenticated' || !session?.user?.id) {
                return;
            }
            
            // Vérifier si le socket est déjà connecté
            if (socketManager.isChatConnected) {
                logger.debug('ChatSocketProvider: Socket chat déjà connecté');
                return;
            }
            
            // Connexion du socket chat avec toutes les conversations
            await connectChat(session.user.id, session.accessToken);
        };
        
        setupChatSocket();
        
        // Pas de nettoyage spécifique ici - géré par GlobalUserSocketProvider
    }, [
        session?.user?.id, 
        session?.accessToken, 
        status,
        connectChat,
        socketManager.isChatConnected
    ]);
    
    // Rendre simplement les enfants
    return <>{children}</>;
}; 