import React from 'react'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import { cn } from '@/lib/utils'
import { CurrentPollWithRelations } from '@shared/poll.types'

interface StepLabeledFormProps {
  question: string
  options: CurrentPollWithRelations['options']
  selectedOptionId: string | null
  onOptionSelect: (optionId: string) => void
  onSubmit: () => void
  locale: string
}

export const StepLabeledForm: React.FC<StepLabeledFormProps> = ({
  question,
  options,
  selectedOptionId,
  onOptionSelect,
  onSubmit,
  locale
}) => {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="mb-6">
        <Label className="block text-lg font-medium mb-4">
          {question}
        </Label>
      </div>
      
      <div className="grid grid-cols-1 gap-3 mb-6">
        {options.map((option) => (
          <Button
            key={option.poll_option_id}
            variant={selectedOptionId === option.poll_option_id ? 'default' : 'outline'}
            className={cn(
              'transition-all rounded-xl',
              selectedOptionId === option.poll_option_id 
                ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-md' 
                : 'hover:bg-gray-50 hover:border-blue-200'
            )}
            onClick={() => onOptionSelect(option.poll_option_id)}
          >
            {option.translations.find(t => t.locale === locale)?.translated_option_text || ''}
          </Button>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button
          className="w-full max-w-xs bg-green-500 hover:bg-green-600 text-white transition-all rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          disabled={!selectedOptionId}
          onClick={onSubmit}
        >
          Valider
        </Button>
      </div>
    </div>
  )
} 