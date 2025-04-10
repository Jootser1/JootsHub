"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { UserSocketService } from "./userSocketService";
import { logger } from "@/utils/logger";

// Création du contexte avec notre service
export const UserSocketContext = createContext<UserSocketService | null>(null);

export const UserSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  console.log("Entering Socket Context", session);
  
  // Création d'une seule instance du service
  const socketService = useMemo(() => {
    const service = new UserSocketService();
    return service;
  }, []);

  // Gestion de la connexion/déconnexion basée sur l'authentification
  useEffect(() => {
    if (session?.user?.id && session?.accessToken) {
      logger.info("Connexion du socket utilisateur...");
      socketService.connect(session.user.id, session.accessToken);
      
      return () => {
        logger.info("Déconnexion du socket utilisateur...");
        socketService.disconnect();
      };
    }
  }, [session?.user?.id, session?.accessToken, socketService]);

  return (
    <UserSocketContext.Provider value={socketService}>
      {children}
    </UserSocketContext.Provider>
  );
};

export function useUserSocketContext() {
  const context = useContext(UserSocketContext);
  if (!context) {
    throw new Error("useUserSocketContext must be used within a UserSocketProvider");
  }
  return context;
}