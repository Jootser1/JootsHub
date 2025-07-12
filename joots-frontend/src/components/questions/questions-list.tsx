"use client"

import { Check, Star, Home, Activity, Smile, Users, Scale, Atom } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import type { Question } from "@/lib/types"

interface QuestionsListProps {
  questions: Question[]
}

export default function QuestionsList({ questions }: QuestionsListProps) {
  const router = useRouter()

  // Map category names to their respective icons
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "religion":
        return <Check className="h-5 w-5 text-purple-600" />
      case "philosophy":
        return <Star className="h-5 w-5 text-purple-400" />
      case "habits":
        return <Users className="h-5 w-5 text-purple-400" />
      case "psychology":
        return <Activity className="h-5 w-5 text-purple-400" />
      case "wellbeing":
        return <Smile className="h-5 w-5 text-green-400" />
      case "home":
        return <Home className="h-5 w-5 text-purple-400" />
      case "science":
        return <Atom className="h-5 w-5 text-purple-400" />
      case "justice":
        return <Scale className="h-5 w-5 text-purple-400" />
      default:
        return <Star className="h-5 w-5 text-purple-400" />
    }
  }

  const handleQuestionClick = (questionId: number) => {
    router.push(`/questions/${questionId}`)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-purple-700 mb-6">TOUTES LES QUESTIONS</h1>
      <div className="space-y-0">
        {questions.map((question) => (
          <div key={question.id}>
            <div
              className="py-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors active:bg-gray-100 touch-manipulation"
              onClick={() => handleQuestionClick(question.id)}
            >
              <h3 className="text-lg text-purple-600 pr-2">{question.text}</h3>
              <div className="flex flex-shrink-0 space-x-1">
                {question.answered && (
                  <div className="bg-purple-600 rounded-md p-1">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                )}
                {/* Show only first 2 categories on mobile */}
                {question.categories
                  .slice(0, window.innerWidth < 640 ? 2 : question.categories.length)
                  .map((category, index) => (
                    <div key={index} className="p-1">
                      {getCategoryIcon(category)}
                    </div>
                  ))}
                {window.innerWidth < 640 && question.categories.length > 2 && (
                  <div className="p-1 text-xs text-gray-500 flex items-center">+{question.categories.length - 2}</div>
                )}
              </div>
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </div>
  )
}
