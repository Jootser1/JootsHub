import axiosInstance from "@/app/api/axiosInstance";
import { useUserStore } from "@/features/user/stores/userStore";
import { useChatStore } from "@/features/chat/stores/chatStore";

export class IcebreakerService {

  
    static async fetchRandomQuestionGroup(activeConversationId:string) {
        const currentUserId = useUserStore.getState().user?.id;
        try {
            if (!activeConversationId || !currentUserId) return;
            const response = await axiosInstance.get('/questions/random', {
              params: {
                userId1: currentUserId,
                userId2: useChatStore.getState().getOtherParticipant(activeConversationId, currentUserId),
              },
            });
            return response.data;
          } catch (error) {
            console.error('Error fetching random question:', error);
          }
    }

    static async submitIcebreakerResponse(userId: string, questionGroupId: string, optionId: string, conversationId: string) {
        try {
            console.log('submitIcebreakerResponse', userId, questionGroupId, optionId, conversationId);
            await axiosInstance.post('/icebreakers/response', {                
                userId,
                questionGroupId,
                optionId,
                conversationId,
            });
        } catch (error) {
            console.error('Error submitting icebreaker response:', error);
        }
    }

    

    
  }
  

