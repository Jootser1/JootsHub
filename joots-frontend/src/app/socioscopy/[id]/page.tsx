import type { Metadata } from "next"
import { notFound } from "next/navigation"
import QuestionDetail from "@/components/questions/question-detail"
import type { Question } from "@/lib/types"

interface QuestionPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: QuestionPageProps): Promise<Metadata> {
  const question = getMockQuestion(Number.parseInt(params.id))

  if (!question) {
    return {
      title: "Question not found",
    }
  }

  return {
    title: `${question.text} | Poll App`,
    description: `Answer the question: ${question.text}`,
  }
}

// This would be replaced with a real database query
function getMockQuestion(id: number): Question | undefined {
  const questions: Question[] = [
    {
      id: 1,
      text: "Croyez-vous en Dieu ?",
      answered: false,
      categories: ["religion", "philosophy"],
      type: "yes_no",
      owner: { type: "app" },
    },
    {
      id: 2,
      text: "Vous rongez-vous les ongles ?",
      answered: false,
      categories: ["habits", "psychology"],
      type: "yes_no",
      owner: { type: "app" },
    },
    {
      id: 3,
      text: "Êtes-vous vraiment heureux ?",
      answered: false,
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
      answered: false,
      categories: ["preferences"],
      type: "multiple_choice",
      options: ["Rouge", "Bleu", "Vert", "Jaune", "Autre"],
      owner: { type: "user", username: "Thomas" },
    },
  ]

  return questions.find((q) => q.id === id)
}

export default function QuestionPage({ params }: QuestionPageProps) {
  const questionId = Number.parseInt(params.id)
  const question = getMockQuestion(questionId)

  if (!question) {
    notFound()
  }

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-4xl">
      <QuestionDetail question={question} />
    </div>
  )
}
