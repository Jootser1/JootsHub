import { UserStatusChange } from "@/types/socket";
import { useUserStore } from "@/features/user/stores/userStore";
import { useContactStore } from "@/features/contacts/stores/contactStore";
import { logger } from "@/utils/logger";

const userStore = useUserStore.getState();
const contactStore = useContactStore.getState();

export function handleUserStatusChange(data: UserStatusChange, currentUserId?: string) {
  if (!currentUserId) return;
  
  // Si c'est l'utilisateur actuel, mettre à jour son statut
  if (data.userId === currentUserId) {
    userStore.setUserStatus(data.isOnline);
  }
  
  // S'assurer que l'utilisateur est dans la liste des contacts
  if (!contactStore.isContact(data.userId)) {
    contactStore.addContact(data.userId);
    logger.debug('L\'utilisateur est ajouté à la liste des contacts', { data });
  }
  // Mise à jour du statut dans le store des contacts
  contactStore.setUserOnlineStatus(data.userId, data.isOnline);
  const onlineContacts = [...contactStore.contactList].filter(contactId => 
    contactStore.isUserOnline(contactId)
  );
  logger.debug('Contacts en ligne mis à jour dans le store des contacts:', onlineContacts);
}

export function handleUserProfileChange(currentUserId?: string) {
  if (!currentUserId) return;

  logger.info(`Changement de profil pour l'utilisateur ${currentUserId}`);
}


