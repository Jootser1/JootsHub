import { UserStatusChangeData } from '@shared/user.types'
import { useUserStore } from '@/features/user/stores/user-store'
import { useContactStore } from '@/features/contacts/stores/contact-store'
import { logger } from '@/utils/logger'

export function handleUserStatusChange(data: UserStatusChangeData, currentUserId?: string) {
  if (!currentUserId) {
    logger.warn('handleUserStatusChange: currentUserId manquant')
    return
  }

  // Si c'est l'utilisateur actuel, mettre à jour son statut
  if (data.user_id === currentUserId) {
    const userStore = useUserStore.getState()
    userStore.setUserStatus(data.is_online)
    return
  }

  // Mise à jour du statut dans le store des contacts uniquement si c'est un contact
  const contactStore = useContactStore.getState()
  const isContact = contactStore.isContact(data.user_id)
  
  if (isContact) {
    contactStore.setUserOnlineStatus(data.user_id, data.is_online)
  }
}

export function handleUserProfileChange(currentUserId?: string) {
  if (!currentUserId) return

  logger.info(`Changement de profil pour l'utilisateur ${currentUserId}`)
}
