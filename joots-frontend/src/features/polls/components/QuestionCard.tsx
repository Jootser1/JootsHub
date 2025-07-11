import React from 'react';
import { Question, QuestionResponse } from '../types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (response: QuestionResponse) => void;
  userId: string;
  conversationId?: string;
  isSubmitting?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onAnswer,
  userId,
  conversationId,
  isSubmitting,
}) => {
  const handleOptionSelect = (optionId: string) => {
    onAnswer({
      userId,
      questionGroupId: question.groupId,
      optionId,
      conversationId,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">{question.text}</h3>
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option.id)}
            disabled={isSubmitting}
            className={`w-full p-3 text-left rounded-md border border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-colors
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}; 