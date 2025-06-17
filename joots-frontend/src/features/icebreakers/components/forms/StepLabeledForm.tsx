import React from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { CurrentPollWithRelations } from '@shared/question.types'

interface StepLabeledFormProps {
  options: CurrentPollWithRelations['options']
  selectedOptionId: string | null
  onOptionSelect: (optionId: string) => void
}

export const StepLabeledForm: React.FC<StepLabeledFormProps> = ({ 
  options, 
  selectedOptionId, 
  onOptionSelect 
}) => {
  console.log(options)
  // Fonction pour obtenir le texte de l'option avec fallback
  const getOptionText = (option: CurrentPollWithRelations['options'][0]) => {
    // Si nous avons une traduction, on l'utilise
    if (option.translations?.[0]?.translated_option_text) {
      return option.translations[0].translated_option_text;
    }
    
    // Sinon, on essaie de trouver une traduction dans n'importe quelle langue
    const anyTranslation = option.translations?.find(t => t.translated_option_text);
    if (anyTranslation) {
      return anyTranslation.translated_option_text;
    }
    
    // En dernier recours, on utilise l'ID de l'option
    return option.poll_option_id;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        {options.map((option) => (
          <Button
            key={option.poll_option_id}
            variant={selectedOptionId === option.poll_option_id ? 'default' : 'outline'}
            className={cn(
              'flex-1 mx-1 transition-all rounded-xl text-center px-2 py-3 min-h-[48px] whitespace-normal',
              selectedOptionId === option.poll_option_id 
                ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-md' 
                : 'hover:bg-gray-50 hover:border-blue-200'
            )}
            onClick={() => onOptionSelect(option.poll_option_id)}
          >
            {getOptionText(option)}
          </Button>
        ))}
      </div>
      {selectedOptionId && (
        <p className="text-center text-sm text-gray-600">
          {getOptionText(options.find(o => o.poll_option_id === selectedOptionId)!)}
        </p>
      )}
    </div>
  )
} 