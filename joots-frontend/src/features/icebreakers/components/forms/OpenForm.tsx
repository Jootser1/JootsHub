import React, { useState } from 'react';
import { Question } from '@shared/question.types';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface OpenFormProps {
  question: Question;
  onAnswer: (opentext: string) => void;
}

export const OpenForm: React.FC<OpenFormProps> = ({
  question,
  onAnswer,
}) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAnswer(text.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto p-4">
      <div className="mb-6">
        <Label className="block text-lg font-medium mb-4">
          {question.question}
        </Label>
      </div>
      
      <div className="space-y-4">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Votre réponse..."
          className="w-full p-2 border rounded-md"
        />
        
        <Button 
          type="submit"
          disabled={!text.trim()}
          className="w-full"
        >
          Répondre
        </Button>
      </div>
    </form>
  );
}; 