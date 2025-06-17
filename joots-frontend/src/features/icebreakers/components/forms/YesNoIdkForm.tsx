import React from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface YesNoIdkFormProps {
  selectedOptionId: string | null
  onOptionSelect: (optionId: string) => void
}

export const YesNoIdkForm: React.FC<YesNoIdkFormProps> = ({ 
  selectedOptionId, 
  onOptionSelect 
}) => {
  const options = [
    { id: 'yes', text: 'Oui' },
    { id: 'no', text: 'Non' },
    { id: 'idk', text: 'Je ne sais pas' }
  ]

  return (
    <div className="grid grid-cols-3 gap-3">
      {options.map((option) => (
        <Button
          key={option.id}
          variant={selectedOptionId === option.id ? 'default' : 'outline'}
          className={cn(
            'transition-all rounded-xl',
            selectedOptionId === option.id 
              ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-md' 
              : 'hover:bg-gray-50 hover:border-blue-200'
          )}
          onClick={() => onOptionSelect(option.id)}
        >
          {option.text}
        </Button>
      ))}
    </div>
  )
} 