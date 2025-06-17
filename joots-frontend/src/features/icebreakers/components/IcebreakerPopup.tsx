'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import categoryTranslations from '@config/category_translations.json'
import { CurrentPollWithRelations } from '@shared/question.types'
import { useChatStore } from '@/features/chat/stores/chat-store'

interface Option {
  id: string
  label: string
}

interface Category {
  category_id: number;
  name: string;
}

interface CategoryTranslation {
  id: number;
  fr: string;
  icon: string;
}

const findCategoryTranslation = (categoryId: number): CategoryTranslation | undefined => {
  return categoryTranslations.find((c) => c.id === categoryId);
};

const getCategoryDisplayName = (category: Category): string => {
  const translation = findCategoryTranslation(category.category_id);
  return translation ? translation.fr : category.name;
};

interface IcebreakerPopupProps {
  poll: CurrentPollWithRelations
  isVisible: boolean
  onAnswer: (questionId: string, optionId: string) => void
  onClose: () => void
}

export function IcebreakerPopup({poll, isVisible, onAnswer, onClose }: IcebreakerPopupProps) {
  const [isRendered, setIsRendered] = useState(false)
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const conversationId = useChatStore.getState().activeConversationId
  if (!conversationId) {
    return null
  }



  useEffect(() => {
    if (isVisible) {
      setIsRendered(true)
      // Réinitialiser la sélection à chaque nouvelle question
      setSelectedOptionId(null)
    } else {
      const timer = setTimeout(() => {
        setIsRendered(false)
      }, 700) // Durée de l'animation
      return () => clearTimeout(timer)
    }
  }, [isVisible])
  
  const handleOptionClick = (optionId: string) => {
    setSelectedOptionId(optionId)
  }
  
  const handleValidate = () => {
    if (poll && selectedOptionId) {
      onAnswer(poll.poll_id, selectedOptionId)
    }
  }
  
  if (!isRendered) return null
  
  return (
    <div
    className={cn(
      'fixed left-0 right-0 top-0 z-50 mx-auto max-w-md transform bg-white rounded-b-2xl shadow-lg',
      'transition-all duration-700 ease-in-out',
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    )}
    style={{
      boxShadow: isVisible
      ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      : 'none',
    }}
    >
    <div className='p-6'>
    <div className='mb-6 flex items-center justify-between'>
    <div className='flex items-center gap-3'>

      <div className='flex items-center gap-3'>
        <div className='flex items-center gap-2'>
            {poll.categories.map((cat: Category) => {
              const translation = findCategoryTranslation(cat.category_id);
              if (!translation) return null;

              return (
                <div
                  key={cat.category_id}
                  className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 hover:bg-blue-100 transition-colors duration-200'
                >
                  <div className="relative group w-fit">
                  <Image
                    src={`/categories/${translation.icon}.svg`}
                    alt={translation.fr}
                    width={24}
                    height={24}
                    className="transition-transform duration-200 group-hover:scale-110"
                  />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-800 text-white text-sm rounded-lg px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {translation.fr}
                    </div>
                    </div>
                </div>
              );
            })}
          
        </div>
        <span className='text-sm font-medium text-gray-600'>
          {poll.categories.map(getCategoryDisplayName).filter(Boolean).join(', ') || 'Question'}
        </span>
      </div>

    </div>
    <button
    onClick={onClose}
    className='rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors duration-200'
    >
    <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-5 w-5'
    viewBox='0 0 20 20'
    fill='currentColor'
    >
    <path
    fillRule='evenodd'
    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
    clipRule='evenodd'
    />
    </svg>
    </button>
    </div>
    
    <div className='mb-6'>
    <h3 className='text-xl font-semibold text-gray-800'>
    {poll?.poll_translations?.[0]?.translation || 'Chargement de la question...'}
    </h3>
    </div>
    
    <div className='max-h-[60vh] overflow-y-auto pr-2'>
    <div
    className={cn(
      'grid gap-3',
      Array.isArray(poll?.options) && poll.options.length > 4
      ? 'grid-cols-2'
      : 'grid-cols-1'
    )}
    >
    {poll?.options &&
      poll.options.length > 0 &&
      poll?.options.map((option, index) => (
        <Button
        key={option.poll_option_id}
        variant={selectedOptionId === option.poll_option_id ? 'default' : 'outline'}
        className={cn(
          'justify-start text-left transition-all rounded-xl',
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          selectedOptionId === option.poll_option_id 
            ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-md' 
            : 'hover:bg-gray-50 hover:border-blue-200'
        )}
        style={{
          transitionDelay: `${index * 50}ms`,
          transitionDuration: '500ms',
        }}
        onClick={() => handleOptionClick(option.poll_option_id)}
        >
        {option.translations?.[0]?.translated_option_text || ''}
        </Button>
      ))}
      </div>
      </div>
      
      {/* Bouton Valider */}
      <div className='mt-6 flex justify-center'>
      <Button
      className='w-full max-w-xs bg-green-500 hover:bg-green-600 text-white transition-all rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
      disabled={!selectedOptionId}
      onClick={handleValidate}
      >
      Valider
      </Button>
      </div>
      </div>
      </div>
    )
  }
  