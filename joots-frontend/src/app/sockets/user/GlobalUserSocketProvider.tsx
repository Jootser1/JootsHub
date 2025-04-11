'use client';

import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSocket } from '@/app/sockets/useSocket';
import { useUserStore } from '@/stores/userStore';
import { useContactStore } from '@/stores/contactStore';
import axiosInstance from '@/app/api/axiosInstance';
import { logger } from '@/utils/logger';
import { UserSocketService } from './userSocketService';
import { UserStatusChange } from '@/types/socket';

interface GlobalUserSocketContextType {
  socketService: UserSocketService | null;
  isConnected: boolean;
  isLoading: boolean;
}

export const GlobalUserSocketContext = createContext<GlobalUserSocketContextType | null>(null);

export const GlobalUserSocketProvider = ({ children }: { children: ReactNode }) => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser, updateUserStatus, syncUserStatus } = useUserStore();
  const { socket, isConnected } = useSocket('users');
  const socketService = socket as UserSocketService;
  const [eventsRegistered, setEventsRegistered] = useState(false);
  


  
  
  useEffect(() => {
    const setupSocket = async () => {
      if (status !== 'authenticated' ||  !isConnected) return;
      
      try {
        // Récupération des données utilisateur si nécessaire
        if (!user) {
          const response = await axiosInstance.get(`/users/${session.user.id}`);
          const userData = {
            id: response.data.id,
            username: response.data.username,
            avatar: response.data.avatar,
            bio: response.data.bio,
            isOnline: true,
            isAvailableForChat: response.data.isAvailableForChat,
          };
          // Mettre à jour l'utilisateur
          setUser(userData);     
        }
        
        socketService.registerEvents();
        
        const contactsResponse = await axiosInstance.get('/users/me/contacts')
        const contactIds = contactsResponse.data.map((contact: any) => contact.contact.id);
        console.log('contactIds', contactIds);  
        // Rejoindre les rooms uniquement si le service est disponible
        if (socketService.isConnected()) {
          // Rejoindre les rooms des contacts
          socketService.joinContactsRooms(contactIds);
          logger.info('Rooms des contacts rejointes:', contactIds.length);
          
          // Mettre à jour le statut après avoir rejoint les rooms
          socketService.updateUserStatus(session.user.id, true);
          logger.info('Statut utilisateur mis à jour dans redis via socket');
        } else {
          logger.warn('Socket déconnecté pendant la configuration, statut non envoyé');
        }
      } catch (error) {
        logger.error("Erreur lors du chargement des contacts:", error);
      }
    }
    setupSocket();
        
    // Nettoyage lors du démontage du composant
    return () => {   
      if (socketService?.isConnected()) {
           
        // Utiliser les contacts déjà chargés dans le store
        const contactIds = useContactStore.getState().contactList;
        if (contactIds && contactIds.size > 0) {
          socketService.leaveContactsRooms([...contactIds]);
        }
        if (user?.id) {
          socketService.updateUserStatus(user.id, false);
          logger.info('Nettoyage socket effectué, utilisateur marqué hors ligne');
        }
      }
      
      // Si les événements ont été enregistrés, on les supprime
      if (eventsRegistered) {
        socketService.unregisterEvents();
        setEventsRegistered(false);
      }
      
      socketService?.disconnect();
    }
  }, [session?.user?.id, isConnected, socketService, eventsRegistered]);
  
  return (
    <GlobalUserSocketContext.Provider value={{ socketService, isConnected, isLoading }}>
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