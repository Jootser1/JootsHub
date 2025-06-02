import { UserStatusChange } from '@/types/socket'
import { useUserStore } from '@/features/user/stores/user-store'
import { useContactStore } from '@/features/contacts/stores/contact-store'
import { logger } from '@/utils/logger'

export function handleUserStatusChange(data: UserStatusChange, currentUserId?: string) {
  if (!currentUserId) {
    logger.warn('handleUserStatusChange: currentUserId manquant')
    return
  }

  logger.debug(`handleUserStatusChange: Reçu pour ${data.userId}, statut: ${data.isOnline}`)

  // Si c'est l'utilisateur actuel, mettre à jour son statut
  if (data.userId === currentUserId) {
    const userStore = useUserStore.getState()
    userStore.setUserStatus(data.isOnline)
    logger.debug(`handleUserStatusChange: Statut utilisateur actuel mis à jour: ${data.isOnline}`)
    return
  }

  // Mise à jour du statut dans le store des contacts uniquement si c'est un contact
  const contactStore = useContactStore.getState()
  const isContact = contactStore.isContact(data.userId)
  
  logger.debug(`handleUserStatusChange: ${data.userId} est-il un contact? ${isContact}`)
  
  if (isContact) {
    // Récupérer l'état avant mise à jour
    const wasOnlineBefore = contactStore.isUserOnline(data.userId)
    
    // Mettre à jour le statut
    contactStore.setUserOnlineStatus(data.userId, data.isOnline)
    
    // Vérifier l'état après mise à jour
    const isOnlineAfter = contactStore.isUserOnline(data.userId)
    
    logger.info(`handleUserStatusChange: Contact ${data.userId.substring(0, 8)}... - Avant: ${wasOnlineBefore}, Après: ${isOnlineAfter}, Statut reçu: ${data.isOnline}`)
    
    // Afficher la liste complète des contacts en ligne
    const onlineContacts = Array.from(contactStore.onlineContacts)
    logger.debug(`handleUserStatusChange: Contacts en ligne (${onlineContacts.length}):`, onlineContacts.map(id => id.substring(0, 8) + '...'))
  } else {
    logger.debug(`handleUserStatusChange: ${data.userId.substring(0, 8)}... n'est pas dans la liste des contacts`)
    
    // Afficher la liste des contacts pour débogage
    const allContacts = Array.from(contactStore.contactList)
    logger.debug(`handleUserStatusChange: Liste des contacts (${allContacts.length}):`, allContacts.map(id => id.substring(0, 8) + '...'))
  }
}

export function handleUserProfileChange(currentUserId?: string) {
  if (!currentUserId) return

  logger.info(`Changement de profil pour l'utilisateur ${currentUserId}`)
}
