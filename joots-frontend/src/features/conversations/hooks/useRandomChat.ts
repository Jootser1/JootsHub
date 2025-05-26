import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { conversationService } from '@/features/conversations/services/conversation-service'
import { logger } from '@/utils/logger'
import axiosInstance from '@/app/api/axios-instance'
import { useContactStore } from '@/features/contacts/stores/contact-store'

export function useRandomChat() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const loadContacts = useContactStore(state => state.loadContacts)

  const startRandomChat = async () => {
    setIsLoading(true)
    try {
      const { conversationId } = await conversationService.startRandomChat()

      // Attendre que la conversation soit disponible
      let retries = 0
      const maxRetries = 3

      while (retries < maxRetries) {
        try {
          await axiosInstance.get(`/conversations/${conversationId}`)
          break
        } catch (error) {
          retries++
          if (retries === maxRetries) {
            throw new Error("La conversation n'est pas encore disponible")
          }
          await new Promise(resolve => setTimeout(resolve, 1000)) // Attendre 1 seconde
        }
      }

      // Charger les contacts après la création de la conversation
      await loadContacts()

      toast.success('Conversation créée ! Redirection vers le chat...')
      router.push(`/conversations/${conversationId}`)
    } catch (error: unknown) {
      logger.error(
        '[useRandomChat] Erreur:',
        error instanceof Error ? error : new Error(String(error))
      )
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    startRandomChat,
  }
}
