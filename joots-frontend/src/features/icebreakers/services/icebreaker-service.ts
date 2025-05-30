import axiosInstance from '@/app/api/axios-instance'
import { useUserStore } from '@/features/user/stores/user-store'
import { useChatStore } from '@/features/chat/stores/chat-store'

export class IcebreakerService {
  static async fetchRandomQuestionGroup(activeConversationId: string) {
    const currentUserId = useUserStore.getState().user?.id
    try {
      if (!activeConversationId || !currentUserId) return
      const response = await axiosInstance.get('/questions/random', {
        params: {
          userId1: currentUserId,
          userId2: useChatStore.getState().getOtherParticipant(activeConversationId, currentUserId),
        },
      })
      return response.data
    } catch (error) {
      console.error('Error fetching random question:', error)
    }
  }

  static async submitIcebreakerResponse(
    userId: string,
    questionGroupId: string,
    optionId: string,
    conversationId: string
  ) {
    try {
      await axiosInstance.post('/icebreakers/response', {
        userId,
        questionGroupId,
        optionId,
        conversationId,
      })
    } catch (error) {
      console.error('Error submitting icebreaker response:', error)
    }
  }
}
