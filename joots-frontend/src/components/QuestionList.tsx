import { useQuestions } from "@/features/questions/hooks/useQuestions";
import { QuestionCard } from "../features/questions/components/QuestionCard";
import { Question, QuestionResponse } from "@/features/questions/types";

interface QuestionListProps {
  userId: string;
  conversationId?: string;
}

const QuestionList = ({ userId, conversationId }: QuestionListProps) => {
  const { questions, submitAnswer, isSubmitting } = useQuestions(conversationId);

  if (!questions || !Array.isArray(questions)) {
    return null;
  }

  return (
    <div>
      {questions.map((q: Question) => (
        <QuestionCard
          key={q.id}
          question={q}
          userId={userId}
          conversationId={conversationId}
          onAnswer={submitAnswer}
          isSubmitting={isSubmitting}
        />
      ))}
    </div>
  );
};

export default QuestionList;