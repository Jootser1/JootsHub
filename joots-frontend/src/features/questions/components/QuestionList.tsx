import React from 'react';
import { Question, QuestionResponse } from '../types';
import { QuestionCard } from './QuestionCard';

interface QuestionListProps {
  questions: Question[];
  userId: string;
  conversationId?: string;
  onAnswer: (response: QuestionResponse) => void;
  isSubmitting?: boolean;
}

export const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  userId,
  conversationId,
  onAnswer,
  isSubmitting,
}) => {
  return (
    <div className="space-y-6">
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          userId={userId}
          conversationId={conversationId}
          onAnswer={onAnswer}
          isSubmitting={isSubmitting}
        />
      ))}
    </div>
  );
}; 