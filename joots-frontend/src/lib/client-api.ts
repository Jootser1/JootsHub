import type { Question } from "./types"

export async function fetchQuestions(
  options: {
    query?: string
    category?: string
    answered?: boolean
  } = {},
): Promise<Question[]> {
  const params = new URLSearchParams()

  if (options.query) {
    params.append("query", options.query)
  }

  if (options.category) {
    params.append("category", options.category)
  }

  if (options.answered !== undefined) {
    params.append("answered", options.answered.toString())
  }

  const response = await fetch(`/api/questions?${params.toString()}`)

  if (!response.ok) {
    throw new Error("Failed to fetch questions")
  }

  return response.json()
}

export async function submitAnswer(questionId: number, answer: string): Promise<{ success: boolean }> {
  const response = await fetch("/api/questions/answer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      questionId,
      answer,
      userId: 1, // In a real app, this would be the authenticated user's ID
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to submit answer")
  }

  return response.json()
}
