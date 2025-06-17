import React from 'react';
import { Question } from '@shared/question.types';
import { Label } from '@/components/ui/Label';

interface ContinuousFormProps {
  question: Question;
  onAnswer: (numeric: number) => void;
}

export const ContinuousForm: React.FC<ContinuousFormProps> = ({
  question,
  onAnswer,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAnswer(parseFloat(e.target.value));
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="mb-6">
        <Label className="block text-lg font-medium mb-4">
          {question.question}
        </Label>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          onChange={handleChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-6
            [&::-webkit-slider-thumb]:h-6
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:border-2
            [&::-webkit-slider-thumb]:border-blue-500
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-md
            [&::-moz-range-thumb]:appearance-none
            [&::-moz-range-thumb]:w-6
            [&::-moz-range-thumb]:h-6
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-2
            [&::-moz-range-thumb]:border-blue-500
            [&::-moz-range-thumb]:cursor-pointer
            [&::-moz-range-thumb]:shadow-md"
        />
        
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Pas d&apos;accord</span>
          <span>D&apos;accord</span>
        </div>
      </div>
    </div>
  );
}; 