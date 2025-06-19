import { UserStatusChangeData } from '@shared/user.types'
import { useUserStore } from '@/features/user/stores/user-store'
import { useContactStore } from '@/features/contacts/stores/contact-store'
import { logger } from '@/utils/logger'

export function handleUserStatusChange(data: UserStatusChangeData, currentUserId?: string) {
  if (!currentUserId) {
    logger.warn('handleUserStatusChange: currentUserId manquant')
    return
  }
  console.log('handleUserStatusChange: data', data)

  logger.debug(`handleUserStatusChange: Reçu pour ${data.user_id}, statut: ${data.is_online}`)

  // Si c'est l'utilisateur actuel, mettre à jour son statut
  if (data.user_id === currentUserId) {
    const userStore = useUserStore.getState()
    userStore.setUserStatus(data.is_online)
    logger.debug(`handleUserStatusChange: Statut utilisateur actuel mis à jour: ${data.is_online}`)
    return
  }

  // Mise à jour du statut dans le store des contacts uniquement si c'est un contact
  const contactStore = useContactStore.getState()
  const isContact = contactStore.isContact(data.user_id)
  
  logger.debug(`handleUserStatusChange: ${data.user_id} est-il un contact? ${isContact}`)
  
  if (isContact) {
    // Récupérer l'état avant mise à jour
    const wasOnlineBefore = contactStore.isUserOnline(data.user_id)
    
    // Mettre à jour le statut
    contactStore.setUserOnlineStatus(data.user_id, data.is_online)
    
    // Vérifier l'état après mise à jour
    const isOnlineAfter = contactStore.isUserOnline(data.user_id)
    
    if (typeof data.user_id === 'string') {
      logger.info(`handleUserStatusChange: Contact ${data.user_id.substring(0, 8)}... - Avant: ${wasOnlineBefore}, Après: ${isOnlineAfter}, Statut reçu: ${data.is_online}`)
    } else {
      logger.error('handleUserStatusChange: user_id est undefined ou non string', data)
    }
    
    // Afficher la liste complète des contacts en ligne
    const onlineContacts = Array.from(contactStore.onlineContacts)
    logger.debug(`handleUserStatusChange: Contacts en ligne (${onlineContacts.length}):`, onlineContacts.map(id => id.substring(0, 8) + '...'))
  } else {
    if (typeof data.user_id === 'string') {
      logger.debug(`handleUserStatusChange: ${data.user_id.substring(0, 8)}... n'est pas dans la liste des contacts`)
    } else {
      logger.error('handleUserStatusChange: user_id est undefined ou non string', data)
    }
    
    // Afficher la liste des contacts pour débogage
    const allContacts = Array.from(contactStore.contactList)
    logger.debug(`handleUserStatusChange: Liste des contacts (${allContacts.length}):`, allContacts.map(id => id.substring(0, 8) + '...'))
  }
}

export function handleUserProfileChange(currentUserId?: string) {
  if (!currentUserId) return

  logger.info(`Changement de profil pour l'utilisateur ${currentUserId}`)
}
