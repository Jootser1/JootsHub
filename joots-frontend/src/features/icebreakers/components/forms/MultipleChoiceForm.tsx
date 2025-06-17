import React from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface Option {
  id: string
  label: string
}

interface MultipleChoiceFormProps {
  options: Option[]
  selectedOptionId: string | null
  onOptionSelect: (optionId: string) => void
}

export const MultipleChoiceForm: React.FC<MultipleChoiceFormProps> = ({ 
  options, 
  selectedOptionId, 
  onOptionSelect 
}) => {
  return (
    <div className="flex flex-col gap-2">
      {options.map((option) => (
        <Button
          key={option.id}
          variant={selectedOptionId === option.id ? 'default' : 'outline'}
          className={cn(
            'w-full transition-all rounded-xl text-center px-4 py-3 min-h-[48px] whitespace-normal',
            selectedOptionId === option.id 
              ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-md' 
              : 'hover:bg-gray-50 hover:border-blue-200'
          )}
          onClick={() => onOptionSelect(option.id)}
        >
          {option.label}
        </Button>
      ))}
      {selectedOptionId && (
        <p className="text-center text-sm text-gray-600 mt-2">
          {options.find(o => o.id === selectedOptionId)?.label}
        </p>
      )}
    </div>
  )
} 