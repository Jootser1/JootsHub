'use client';

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useUserStore } from '@/features/user/stores/userStore';
import axiosInstance from '@/app/api/axiosInstance';
import { logger } from '@/utils/logger';
import { UserSocketService } from './userSocketService';
import { useUserSocketStore } from '@/features/user/stores/userSocketStore';

interface GlobalUserSocketContextType {
  isLoading: boolean;
}


export const GlobalUserSocketContext = createContext<GlobalUserSocketContextType | null>(null);

export const GlobalUserSocketProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useUserStore();
  
  
  useEffect(() => {
    const setupSocket = async () => {
      if (status !== 'authenticated'|| !session?.user?.id || !session?.accessToken) {
        logger.debug('GlobalUserSocketProvider: Conditions non remplies pour la connexion', { status, userId: session?.user?.id });
        return;
      }
      
      logger.info('GlobalUserSocketProvider: Début de la configuration du socket');
      
      try {
        // Récupération des données utilisateur si nécessaire
        if (!user) {
          logger.debug('GlobalUserSocketProvider: Récupération des données utilisateur');
          const response = await axiosInstance.get(`/users/${session.user.id}`);
          const userData = {
            id: response.data.id,
            username: response.data.username,
            avatar: response.data.avatar,
            bio: response.data.bio,
            isOnline: true,
            isAvailableForChat: response.data.isAvailableForChat,
          };
          setUser(userData);     
        }
        
        // Utiliser le store pour gérer la connexion
        await useUserSocketStore.getState().connectUserSocket(session.user.id, session.accessToken);
        setIsLoading(false);
        logger.info('GlobalUserSocketProvider: Socket connecté avec succès');
      } catch (error) {
        logger.error("Erreur lors de la configuration du socket:", error);
        setIsLoading(false);
      }
    };
    
    setupSocket();
    
    return () => {
      logger.info('GlobalUserSocketProvider: Nettoyage du socket');
      useUserSocketStore.getState().disconnectUserSocket();
    };
  }, [session?.user?.id, session?.accessToken, status]);
  
  return (
    <GlobalUserSocketContext.Provider value={{ isLoading }}>
    {children}
    </GlobalUserSocketContext.Provider>
  );
};

export const useGlobalUserSocketContext = () => {
  const context = useContext(GlobalUserSocketContext);
  if (!context) {
    throw new Error('useGlobalUserSocketContext must be used within a GlobalUserSocketProvider');
  }
  return context;
}; 