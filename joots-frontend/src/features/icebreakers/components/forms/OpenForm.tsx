import React, { useState } from 'react';
import { Question } from '@shared/question.types';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface OpenFormProps {
  question: string;
  onAnswer: (opentext: string) => void;
  onSubmit: () => void;
}

export const OpenForm: React.FC<OpenFormProps> = ({
  question,
  onAnswer,
  onSubmit,
}) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAnswer(text.trim());
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-4">
      <div className="mb-6">
        <Label className="block text-lg font-medium mb-4">
          {question}
        </Label>
      </div>
      
      <div className="space-y-4 mb-6">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Votre réponse..."
          className="w-full p-2 border rounded-md"
        />
      </div>
      
      <div className="flex justify-center">
        <Button 
          type="submit"
          disabled={!text.trim()}
          className="w-full max-w-xs bg-green-500 hover:bg-green-600 text-white transition-all rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Valider
        </Button>
      </div>
    </form>
  );
}; 