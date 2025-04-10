import { UserStatusChange } from "@/types/socket";
import { useUserStore } from "@/stores/userStore";
import { useContactStore } from "@/stores/contactStore";
import { useSession } from "next-auth/react";
import { logger } from "@/utils/logger";

const userStore = useUserStore.getState();
const contactStore = useContactStore.getState();

export function handleUserStatusChange(data: UserStatusChange) {
  const { data: session } = useSession();
  if (!session?.user?.id) return;

  logger.info(`Changement de statut pour l'utilisateur ${data.userId}: ${data.isOnline ? 'en ligne' : 'hors ligne'}`);
  
  // Si c'est l'utilisateur actuel, mettre à jour son statut
  if (data.userId === session.user.id) {
    userStore.updateUserStatus(data.isOnline);
  }
  
  // Mise à jour du statut dans le store des contacts
  contactStore.setUserOnlineStatus(data.userId, data.isOnline);
}

export function handleUserPresenceChange(data: { userId: string; isOnline: boolean }) {
  const { data: session } = useSession();
  if (!session?.user?.id) return;

  logger.info(`Changement de présence pour l'utilisateur ${data.userId}: ${data.isOnline ? 'en ligne' : 'hors ligne'}`);
  
  // Si c'est l'utilisateur actuel, mettre à jour son statut
  if (data.userId === session.user.id) {
    userStore.updateUserStatus(data.isOnline);
  }
  
  // Mise à jour du statut dans le store des contacts
  contactStore.setUserOnlineStatus(data.userId, data.isOnline);
}
