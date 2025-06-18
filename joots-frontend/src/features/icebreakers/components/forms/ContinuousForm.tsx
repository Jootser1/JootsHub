import React, { useState } from 'react';
import { Question } from '@shared/question.types';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { CurrentPollWithRelations } from '@shared/question.types';

interface ContinuousFormProps {
  question: string;
  onAnswer: (numeric: number) => void;
  onSubmit: () => void;
  poll: CurrentPollWithRelations;
}

export const ContinuousForm: React.FC<ContinuousFormProps> = ({
  question,
  onAnswer,
  onSubmit,
  poll
}) => {
  const scaleConstraint = poll.poll_scale_constraints;
  const [currentValue, setCurrentValue] = useState<number>(scaleConstraint?.min_value ?? 0);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setCurrentValue(value);
    onAnswer(value);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="mb-6">
        <Label className="block text-lg font-medium mb-4">
          {question}
        </Label>
      </div>
      
      <div className="relative mb-6">
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {currentValue}
        </div>
        
        <input
          type="range"
          min={scaleConstraint?.min_value ?? 0}
          max={scaleConstraint?.max_value ?? 100}
          step={scaleConstraint?.step ?? 1}
          value={currentValue}
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
          <span className="bg-gray-100 px-2 py-1 rounded">{scaleConstraint?.min_value ?? 0}</span>
          <span className="bg-gray-100 px-2 py-1 rounded">{scaleConstraint?.max_value ?? 100}</span>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button
          className="w-full max-w-xs bg-green-500 hover:bg-green-600 text-white transition-all rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          onClick={onSubmit}
        >
          Valider
        </Button>
      </div>
    </div>
  );
}; 