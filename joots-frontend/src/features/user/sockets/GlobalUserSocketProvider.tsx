'use client';

import { createContext, useContext, ReactNode, useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useUserStore } from '@/features/user/stores/userStore';
import { logger } from '@/utils/logger';
import { useSocketManager } from '@/hooks/useSocketManager';
import { useContactStore } from '@/features/contacts/stores/contactStore';

interface GlobalUserSocketContextType {
  isLoading: boolean;
  isUserConnected: boolean;
  isChatConnected: boolean;
}

const GlobalUserSocketContext = createContext<GlobalUserSocketContextType>({
  isLoading: true,
  isUserConnected: false,
  isChatConnected: false
});

// Constante pour définir le délai de rafraîchissement des contacts (15 minutes)
const CONTACT_REFRESH_INTERVAL = 15 * 60 * 1000;

export const GlobalUserSocketProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const { user, syncUserData } = useUserStore();
  const socketManager = useSocketManager();

  const connectUserSocket = useCallback(async (userId: string, token: string): Promise<boolean> => {
    try {
      await socketManager.connectUserSocket(userId, token);
      return true;
    } catch (error) {
      return false;
    }
  }, [socketManager]);


  useEffect(() => {
    const setupSocket = async () => {
      if (status !== 'authenticated'|| !session?.user?.id || !session?.accessToken) {
        logger.debug('GlobalUserSocketProvider: Conditions non remplies pour la connexion', { status, userId: session?.user?.id });
        return;
      }
                  
      try {
        // Récupération des données utilisateur depuis bdd et sync userStore
        if (!user) {
          await syncUserData();     
        }

        //Récupération des données Contacts depuis bdd et Mise à jour des contacts dans ContactStore
        const contactStore = useContactStore.getState();
        const lastSyncTime = contactStore.lastSyncTime || 0;
        const shouldRefresh = Date.now() - lastSyncTime > CONTACT_REFRESH_INTERVAL;
        
        if (contactStore.contactList.size === 0 || shouldRefresh) {
          await contactStore.loadContacts();
        }
        
        // Connexion du socket utilisateur
        const success = await connectUserSocket(session.user.id, session.accessToken);
        logger.info(`(Re)Connexion socket utilisateur ${success ? 'réussie' : 'échouée'}`);
      } catch (error) {
        logger.error("Erreur lors de la configuration du socket:", error);
        setIsLoading(false);
      }
    };
    
    setupSocket();
    
    const handleBeforeUnload = () => {
      logger.info('GlobalUserSocketProvider: Fermeture de page détectée, nettoyage des sockets');
      socketManager.disconnectAll();
    };
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        logger.info('GlobalUserSocketProvider: Page cachée, nettoyage des sockets');
        socketManager.disconnectAll();
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('visibilitychange', handleVisibilityChange);
    logger.debug('Dependance', { userId: session?.user?.id, status, socketManager });
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Garder aussi la condition existante
      if (status === "unauthenticated") {
        logger.info('GlobalUserSocketProvider: Nettoyage du socket (session terminée)');
        socketManager.disconnectAll();
      }
    };
  }, [session?.user?.id, status, socketManager.isUserConnected]);
  
  const contextValue = {
    isLoading,
    isUserConnected: socketManager.isUserConnected,
    isChatConnected: socketManager.isChatConnected
  };
  
  return (
    <GlobalUserSocketContext.Provider value={contextValue}>
      {children}
    </GlobalUserSocketContext.Provider>
  );
};

export const useGlobalUserSocket = () => {
  const context = useContext(GlobalUserSocketContext);
  if (!context) {
    throw new Error('useGlobalUserSocket must be used within a GlobalUserSocketProvider');
  }
  return context;
}; 