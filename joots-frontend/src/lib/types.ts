export type QuestionType = "yes_no" | "multiple_choice" | "metric"

export interface Question {
  id: number
  text: string
  answered: boolean
  categories: string[]
  status?: "pending" | "approved" | "rejected"
  type: QuestionType
  options?: string[] // For multiple choice questions
  metricRange?: {
    min: number
    max: number
    step: number
    labels?: {
      min: string
      max: string
    }
  } // For metric questions
  owner: {
    type: "app" | "user"
    username?: string
  }
}

export interface Category {
  id: string
  name: string
  icon: string
}

export interface User {
  id: number
  name: string
  email: string
  answeredQuestions: number[]
  createdQuestions: number[]
}

export interface Answer {
  questionId: number
  userId: number
  value: string | number | boolean
  timestamp: Date
}
