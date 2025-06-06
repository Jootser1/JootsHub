import axiosInstance from '@/app/api/axios-instance'
import { logger } from '@/utils/logger'
import { AxiosError } from 'axios'

export interface RandomChatResponse {
  conversationId: string
  randomUser: {
    id: string
    username: string
  }
}

export const conversationService = {
  async startRandomChat(): Promise<RandomChatResponse> {
    try {
      // 1. Trouver un utilisateur aléatoire
      const response = await axiosInstance.get('/users/random/available')
      const randomUser = response.data

      // 2. Créer une conversation avec cet utilisateur
      const conversationResponse = await axiosInstance.post('/conversations', {
        receiverId: randomUser.id,
      })
      const conversation = conversationResponse.data

      logger.info(`[ChatService] Nouvelle conversation créée avec ${randomUser.username}`)

      return {
        conversationId: conversation.id,
        randomUser: {
          id: randomUser.id,
          username: randomUser.username,
        },
      }
    } catch (error) {
      logger.error(
        '[ChatService] Erreur lors de la création du chat aléatoire:',
        error instanceof Error ? error : new Error(String(error))
      )
      if (error instanceof AxiosError && error.response?.status === 404) {
        throw new Error('Aucun utilisateur disponible pour le moment. Revenez plus tard !')
      }
      throw new Error('Une erreur est survenue lors de la création du chat')
    }
  },
}
