"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, User, AppWindow } from "lucide-react"
import Image from "next/image"
import type { Question } from "@/lib/types"

interface QuestionResultsProps {
  question: Question
}

export default function QuestionResults({ question }: QuestionResultsProps) {
  const router = useRouter()

  const handleGoBack = () => {
    router.push("/questions")
  }

  // Mock results data - in a real app, this would come from the database
  const getResultsData = () => {
    switch (question.type) {
      case "yes_no":
        return {
          yes: 60,
          no: 30,
          unknown: 10,
          yourAnswer: true,
          totalResponses: 128,
        }
      case "multiple_choice":
        return {
          options: [
            { label: "Rouge", percentage: 25, count: 32 },
            { label: "Bleu", percentage: 40, count: 51 },
            { label: "Vert", percentage: 20, count: 26 },
            { label: "Jaune", percentage: 10, count: 13 },
            { label: "Autre", percentage: 5, count: 6 },
          ],
          yourAnswer: "Bleu",
          totalResponses: 128,
        }
      case "metric":
        return {
          distribution: [
            { value: 0, percentage: 2 },
            { value: 1, percentage: 3 },
            { value: 2, percentage: 5 },
            { value: 3, percentage: 8 },
            { value: 4, percentage: 10 },
            { value: 5, percentage: 15 },
            { value: 6, percentage: 20 },
            { value: 7, percentage: 18 },
            { value: 8, percentage: 12 },
            { value: 9, percentage: 5 },
            { value: 10, percentage: 2 },
          ],
          average: 6.2,
          yourAnswer: 7,
          totalResponses: 128,
        }
      default:
        return null
    }
  }

  const resultsData = getResultsData()

  const renderResults = () => {
    if (!resultsData) return <div>Aucun résultat disponible</div>

    switch (question.type) {
      case "yes_no":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Oui</span>
                <span>{resultsData.yes}%</span>
              </div>
              <Progress value={resultsData.yes} className="h-4" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Non</span>
                <span>{resultsData.no}%</span>
              </div>
              <Progress value={resultsData.no} className="h-4" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Je ne sais pas</span>
                <span>{resultsData.unknown}%</span>
              </div>
              <Progress value={resultsData.unknown} className="h-4" />
            </div>
            <div className="mt-6 p-4 bg-purple-50 rounded-md">
              <p className="text-purple-700">
                Votre réponse: <strong>{resultsData.yourAnswer ? "Oui" : "Non"}</strong>
              </p>
            </div>
          </div>
        )

      case "multiple_choice":
        return (
          <div className="space-y-6">
            {resultsData.options.map((option, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span>{option.label}</span>
                  <span>{option.percentage}%</span>
                </div>
                <Progress
                  value={option.percentage}
                  className={`h-4 ${option.label === resultsData.yourAnswer ? "bg-purple-100" : ""}`}
                />
              </div>
            ))}
            <div className="mt-6 p-4 bg-purple-50 rounded-md">
              <p className="text-purple-700">
                Votre réponse: <strong>{resultsData.yourAnswer}</strong>
              </p>
            </div>
          </div>
        )

      case "metric":
        return (
          <div className="space-y-6">
            <div className="flex h-40 items-end space-x-1">
              {resultsData.distribution.map((item, index) => (
                <div
                  key={index}
                  className={`flex-1 ${item.value === resultsData.yourAnswer ? "bg-purple-600" : "bg-purple-300"}`}
                  style={{ height: `${item.percentage * 2}%` }}
                  title={`${item.value}: ${item.percentage}%`}
                />
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              {question.metricRange?.labels?.min || question.metricRange?.min || 0}
              {question.metricRange?.labels?.max || question.metricRange?.max || 10}
            </div>
            <div className="mt-6 p-4 bg-purple-50 rounded-md space-y-2">
              <p className="text-purple-700">
                Votre réponse: <strong>{resultsData.yourAnswer}</strong>
              </p>
              <p className="text-purple-700">
                Moyenne de la communauté: <strong>{resultsData.average}</strong>
              </p>
            </div>
          </div>
        )

      default:
        return <div>Type de question non pris en charge</div>
    }
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" className="flex items-center text-purple-700" onClick={handleGoBack}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour aux questions
      </Button>

      <Card className="shadow-md">
        <CardHeader className="bg-purple-50 relative">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl text-purple-700">{question.text}</CardTitle>
            <div className="w-20 h-20 relative">
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
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-purple-700">Résultats</h3>
            <p className="text-gray-500 text-sm">Basé sur {getResultsData()?.totalResponses} réponses</p>
          </div>
          {renderResults()}
        </CardContent>
      </Card>
    </div>
  )
}
