import axiosInstance from '@/app/api/axios-instance'
import { useUserStore } from '@/features/user/stores/user-store'
import { useChatStore } from '@/features/chat/stores/chat-store'
import { PostedResponseEvent } from '@shared/icebreaker-event.types'

export class IcebreakerService {
  static async fetchRandomPoll(activeConversationId: string) {
    const currentUserId = useUserStore.getState().user?.user_id
    try {
      if (!activeConversationId || !currentUserId) return
      const response = await axiosInstance.get('/questions/random', {
        params: {
          conversationId: activeConversationId,
          userId1: currentUserId,
          userId2: useChatStore.getState().getOtherParticipant(activeConversationId, currentUserId),
        },
      })
      return response.data
    } catch (error) {
      console.error('Error fetching random question:', error)
    }
  }

  static async submitIcebreakerResponse(response: PostedResponseEvent) {
    try {
      await axiosInstance.post('/icebreakers/response', response)
    } catch (error) {
      console.error('Error submitting icebreaker response:', error)
    }
  }
}
