import type { Metadata } from "next"
import { notFound } from "next/navigation"
import QuestionResults from "@/components/questions/question-results"
import type { Question } from "@/lib/types"

interface ResultsPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ResultsPageProps): Promise<Metadata> {
  const question = getMockQuestion(Number.parseInt(params.id))

  if (!question) {
    return {
      title: "Question not found",
    }
  }

  return {
    title: `Résultats: ${question.text} | Poll App`,
    description: `Voir les résultats pour la question: ${question.text}`,
  }
}

// This would be replaced with a real database query
function getMockQuestion(id: number): Question | undefined {
  const questions: Question[] = [
    {
      id: 1,
      text: "Croyez-vous en Dieu ?",
      answered: true,
      categories: ["religion", "philosophy"],
      type: "yes_no",
      owner: { type: "app" },
    },
    {
      id: 2,
      text: "Vous rongez-vous les ongles ?",
      answered: true,
      categories: ["habits", "psychology"],
      type: "yes_no",
      owner: { type: "app" },
    },
    {
      id: 3,
      text: "Êtes-vous vraiment heureux ?",
      answered: true,
      categories: ["psychology", "wellbeing"],
      type: "metric",
      metricRange: {
        min: 0,
        max: 10,
        step: 1,
        labels: {
          min: "Pas du tout",
          max: "Extrêmement",
        },
      },
      owner: { type: "user", username: "Sophie" },
    },
    {
      id: 4,
      text: "Quelle est votre couleur préférée ?",
      answered: true,
      categories: ["preferences"],
      type: "multiple_choice",
      options: ["Rouge", "Bleu", "Vert", "Jaune", "Autre"],
      owner: { type: "user", username: "Thomas" },
    },
  ]

  return questions.find((q) => q.id === id)
}

export default function ResultsPage({ params }: ResultsPageProps) {
  const questionId = Number.parseInt(params.id)
  const question = getMockQuestion(questionId)

  if (!question) {
    notFound()
  }

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-4xl">
      <QuestionResults question={question} />
    </div>
  )
}
