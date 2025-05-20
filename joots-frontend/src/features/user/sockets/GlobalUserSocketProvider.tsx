'use client';

import { createContext, useContext, ReactNode, useEffect, useState, useCallback, useRef } from 'react';
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
  const setupDoneRef = useRef(false);
  const isAuthenticatedRef = useRef(false);
  const connectionAttemptedRef = useRef(false);

  const connectUserSocket = useCallback(async (userId: string, token: string): Promise<boolean> => {
    if (connectionAttemptedRef.current && setupDoneRef.current) {
      return socketManager.isUserConnected;
    }
    
    connectionAttemptedRef.current = true;
    
    try {
      if (socketManager.isUserConnected) {
        return true;
      }
      
      await socketManager.connectUserSocket(userId, token);
      return true;
    } catch (error) {
      logger.error('Erreur lors de la connexion du socket utilisateur:', error instanceof Error ? error : new Error(String(error)));
      return false;
    }
  }, [socketManager]);

  useEffect(() => {
    // Reset connection attempt flag if userId or authentication state changes
    if (session?.user?.id !== undefined) {
      connectionAttemptedRef.current = false;
    }

    // Ne rien faire si l'utilisateur n'est pas authentifié
    if (status !== 'authenticated') {
      logger.debug('GlobalUserSocketProvider: Non authentifié, pas de connexion socket');
      isAuthenticatedRef.current = false;
      return;
    }
    
    // Marquer comme authentifié
    isAuthenticatedRef.current = true;
    
    const setupSocket = async () => {
      // Éviter les configurations multiples et vérifier l'authentification
      if (setupDoneRef.current || !session?.user?.id || !session?.accessToken) {
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
        
        setupDoneRef.current = true;
      } catch (error) {
        logger.error("Erreur lors de la configuration du socket:", error instanceof Error ? error : new Error(String(error)));
      } finally {
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
        logger.info('GlobalUserSocketProvider: Page cachée');
        // Ne pas déconnecter immédiatement pour éviter les reconnexions inutiles
        // lors de changements d'onglets rapides
      } else if (document.visibilityState === 'visible') {
        logger.info('GlobalUserSocketProvider: Page de nouveau visible, vérification des sockets');
        // Vérifier si les sockets sont toujours connectés
        if (!socketManager.isUserConnected && session?.user?.id && session?.accessToken) {
          logger.info('GlobalUserSocketProvider: Reconnexion du socket utilisateur');
          connectUserSocket(session.user.id, session.accessToken);
        }
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Mettre à jour les états réels des sockets
    const socketInfo = { 
      userId: session?.user?.id, 
      status, 
      socketManager: {
        isUserConnected: socketManager.isUserConnected,
        isChatConnected: socketManager.isChatConnected
      }
    };

    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Garder aussi la condition existante
      if (!isAuthenticatedRef.current) {
        logger.info('GlobalUserSocketProvider: Nettoyage du socket (session terminée)');
        socketManager.disconnectAll();
      }
    };
  }, [
    session?.user?.id, 
    status,
    socketManager,
    connectUserSocket,
    syncUserData
  ]);
  
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