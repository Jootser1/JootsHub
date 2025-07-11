"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Check, ArrowLeft, User, AppWindow } from "lucide-react"
import Image from "next/image"
import MobileNav from "@/components/Navigation"
import type { Question } from "@/lib/types"

interface QuestionDetailProps {
  question: Question
}

export default function QuestionDetail({ question }: QuestionDetailProps) {
  const router = useRouter()
  const [answer, setAnswer] = useState<string | number | boolean | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async () => {
    if (answer === null) return

    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to save the answer
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting answer:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoBack = () => {
    router.back()
  }

  const renderAnswerInput = () => {
    switch (question.type) {
      case "yes_no":
        return (
          <div className="grid grid-cols-3 gap-4">
            <Button
              type="button"
              onClick={() => setAnswer(true)}
              className={`py-6 text-lg ${
                answer === true
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              {answer === true && <Check className="mr-2 h-5 w-5" />}
              Oui
            </Button>
            <Button
              type="button"
              onClick={() => setAnswer(false)}
              className={`py-6 text-lg ${
                answer === false
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              {answer === false && <Check className="mr-2 h-5 w-5" />}
              Non
            </Button>
            <Button
              type="button"
              onClick={() => setAnswer("unknown")}
              className={`py-6 text-lg ${
                answer === "unknown"
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-purple-600 hover:bg-purple-700 text-white"
              }`}
            >
              {answer === "unknown" && <Check className="mr-2 h-5 w-5" />}
              Je ne sais pas
            </Button>
          </div>
        )

      case "multiple_choice":
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <Button
                key={index}
                type="button"
                onClick={() => setAnswer(option)}
                className={`w-full py-4 text-left justify-start text-lg ${
                  answer === option
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {answer === option && <Check className="mr-2 h-5 w-5" />}
                {option}
              </Button>
            ))}
          </div>
        )

      case "metric":
        const { min, max, step, labels } = question.metricRange || { min: 0, max: 10, step: 1 }
        return (
          <div className="space-y-8">
            <Slider
              min={min}
              max={max}
              step={step}
              value={answer !== null ? [answer as number] : [min]}
              onValueChange={(values) => setAnswer(values[0])}
              className="py-4"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{labels?.min || min}</span>
              <span>{labels?.max || max}</span>
            </div>
            {answer !== null && <div className="text-center font-bold text-3xl text-purple-700 py-4">{answer}</div>}
          </div>
        )

      default:
        return <div>Type de question non pris en charge</div>
    }
  }

  return (
    <div className="space-y-6 pb-20">
      <Button variant="ghost" className="flex items-center text-purple-700" onClick={handleGoBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour aux questions
      </Button>

      <Card className="shadow-md">
        <CardHeader className="bg-purple-50 relative">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl md:text-2xl text-purple-700">{question.text}</CardTitle>
            <div className="w-16 h-16 md:w-20 md:h-20 relative flex-shrink-0 ml-2">
              <Image
                src="/images/questions-logo.png"
                alt="Questions Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {question.categories.map((category, index) => (
              <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                {category}
              </span>
            ))}
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-2">
            {question.owner.type === "app" ? (
              <>
                <AppWindow className="h-4 w-4 mr-1" />
                <span>Question de l'application</span>
              </>
            ) : (
              <>
                <User className="h-4 w-4 mr-1" />
                <span>Par {question.owner.username}</span>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {isSubmitted ? (
            <div className="flex flex-col items-center py-8 space-y-4">
              <div className="rounded-full bg-green-100 p-3">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-700">Réponse enregistrée !</h3>
              <p className="text-gray-500 text-center">
                Merci d'avoir participé. Vous pouvez maintenant voir comment vos réponses se comparent à celles de la
                communauté.
              </p>
              <Button className="mt-4" onClick={() => router.push(`/questions/${question.id}/results`)}>
                Voir les résultats
              </Button>
            </div>
          ) : (
            <div className="py-6 space-y-8">
              <h3 className="text-xl font-semibold text-purple-700">Votre réponse</h3>
              {renderAnswerInput()}
            </div>
          )}
        </CardContent>
        {!isSubmitted && (
          <CardFooter className="flex justify-end border-t bg-gray-50 p-4">
            <Button
              onClick={handleSubmit}
              disabled={answer === null || isSubmitting}
              className="bg-purple-700 hover:bg-purple-800 w-full md:w-auto py-6 md:py-2 text-lg md:text-base"
            >
              {isSubmitting ? "Envoi en cours..." : "Soumettre ma réponse"}
            </Button>
          </CardFooter>
        )}
      </Card>

      <MobileNav />
    </div>
  )
}
