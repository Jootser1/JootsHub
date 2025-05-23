"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Option {
  id: string;
  label: string;
}

interface Question {
  id: string;
  questions: Array<{
    question: string;
  }>;
  options: Option[];
  category?: {
    name: string;
  };
  categories?: {
    logo?: string;
  };
}

interface IcebreakerPopupProps {
  question: Question;
  isVisible: boolean;
  onAnswer: (questionId: string, optionId: string) => void;
  onClose: () => void;
}

export function IcebreakerPopup({ question, isVisible, onAnswer, onClose }: IcebreakerPopupProps) {
  const [isRendered, setIsRendered] = useState(false)
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  
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
    if (question && selectedOptionId) {
      onAnswer(question.id, selectedOptionId)   
    }
  }
  
  if (!isRendered) return null
  
  return (
    <div
    className={cn(
      "fixed left-0 right-0 top-0 z-50 mx-auto max-w-md transform bg-white shadow-lg",
      "transition-all duration-700 ease-in-out",
      isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
    )}
    style={{
      boxShadow: isVisible ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" : "none",
    }}
    >
    <div className="p-4">
    <div className="mb-4 flex items-center justify-between">
    <div className="flex items-center gap-2">
    {question?.category && (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
      <Image
      src={question.categories?.logo || "/placeholder.svg"}
      alt={question.category.name}
      width={20}
      height={20}
      className="h-5 w-5"
      />
      </div>
    )}
    <span className="text-sm font-medium text-gray-500">{question?.category?.name || "Question"}</span>
    </div>
    <button onClick={onClose} className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path
    fillRule="evenodd"
    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
    clipRule="evenodd"
    />
    </svg>
    </button>
    </div>
    
    <div className="mb-4">
    <h3 className="text-lg font-semibold">{question?.questions && question.questions.length > 0 ? question.questions[0].question : 'Chargement de la question...'}</h3>
    </div>
    
    <div className="max-h-[60vh] overflow-y-auto">
    <div className={cn("grid gap-2", question && question.options.length > 4 ? "grid-cols-2" : "grid-cols-1")}>
    
    
       {question?.options && question.options.length > 0 && question?.options.map((option: Option, index: number) => (
         <Button
           key={option.id}
           variant={selectedOptionId === option.id ? "default" : "outline"}
           className={cn(
             "justify-start text-left transition-all",
             isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
             selectedOptionId === option.id ? "bg-blue-500 text-white hover:bg-blue-600" : "",
           )}
           style={{
             transitionDelay: `${index * 50}ms`,
             transitionDuration: "500ms",
           }}
           onClick={() => handleOptionClick(option.id)}
         >
           {option.label}
         </Button>
       ))
     }
      </div>
      </div>
      
      
      {/* Bouton Valider */}
      <div className="mt-4 flex justify-center">
      <Button
      className="w-full max-w-xs bg-green-500 hover:bg-green-600 text-white transition-all"
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
  
  export default IcebreakerPopup; 