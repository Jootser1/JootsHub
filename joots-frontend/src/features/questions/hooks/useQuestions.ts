import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { questionsApi } from '../api/questions.api';
import { QuestionResponse } from '../types';

export const useQuestions = (conversationId?: string) => {
  const queryClient = useQueryClient();

  const { data: questions, isLoading: isLoadingQuestions } = useQuery({
    queryKey: ['questions', conversationId],
    queryFn: () => conversationId 
      ? questionsApi.getQuestionsByConversation(conversationId)
      : questionsApi.getRandomQuestionGroup(),
    enabled: !!conversationId,
  });

  const { mutate: submitAnswer, isLoading: isSubmitting } = useMutation({
    mutationFn: (answer: QuestionResponse) => questionsApi.submitAnswer(answer),
    onSuccess: () => {
      if (conversationId) {
        queryClient.invalidateQueries({ queryKey: ['questions', conversationId] });
      }
    },
  });

  return {
    questions,
    isLoadingQuestions,
    submitAnswer,
    isSubmitting,
  };
}; 