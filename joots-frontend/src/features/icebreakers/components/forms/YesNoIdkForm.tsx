import React from 'react'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import { cn } from '@/lib/utils'
import { CurrentPollWithRelations } from '@shared/poll.types'

interface YesNoIdkFormProps {
  question: string
  options: CurrentPollWithRelations['options']
  selectedOptionId: string | null
  onOptionSelect: (optionId: string) => void
  onSubmit: () => void
  locale: string
}

export const YesNoIdkForm: React.FC<YesNoIdkFormProps> = ({ 
  question,
  selectedOptionId, 
  onOptionSelect,
  options,
  onSubmit,
  locale
}) => {
  // Trier les options par ordre pour s'assurer que Oui, Non, Je ne sais pas sont dans le bon ordre
  const sortedOptions = [...options].sort((a, b) => a.order - b.order)

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="mb-6">
        <Label className="block text-lg font-medium mb-4">
          {question}
        </Label>
      </div>
      
      <div className="grid grid-cols-3 gap-3 mb-6">
        {sortedOptions.map((option) => (
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