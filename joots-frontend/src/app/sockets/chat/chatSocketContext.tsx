import { useSession } from "next-auth/react";
import React, { createContext, useContext, useMemo, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { ChatSocketService } from "./chatSocketService";
import { logger } from "@/utils/logger";

export const ChatSocketContext = createContext<ChatSocketService | null>(null);

export const ChatSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  // Création d'une seule instance du service
  const socketService = useMemo(() => {
    const service = new ChatSocketService();
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
    <ChatSocketContext.Provider value={socketService}>
      {children}
    </ChatSocketContext.Provider>
  );
};

export function useChatSocketContext() {
  const context = useContext(ChatSocketContext);
  if (!context) {
    throw new Error("useChatSocketContext must be used within a ChatSocketProvider");
  }
  return context;
} 