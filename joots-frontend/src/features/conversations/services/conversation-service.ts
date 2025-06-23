import axiosInstance from '@/app/api/axios-instance'
import { logger } from '@/utils/logger'
import { AxiosError } from 'axios'
import { RandomChatResponse } from '@shared/conversation.types'



export const conversationService = {
  async startRandomChat(): Promise<RandomChatResponse> {
    try {
      // 1. Trouver un utilisateur aléatoire
      const conversation = await axiosInstance.post('/conversations/random-chat')
 
      logger.info(`[ChatService] Nouvelle conversation créée avec ${conversation.data.randomUser.username}`)

      return {
        conversation_id: conversation.data.conversation_id,
        randomUser: {
          user_id: conversation.data.randomUser.user_id,
          username: conversation.data.randomUser.username,
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
