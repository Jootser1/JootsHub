import { NextResponse } from "next/server"
import { getQuestions, searchQuestions } from "@/lib/db"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("query")
    const category = searchParams.get("category")
    const answered = searchParams.get("answered")

    let questions

    if (query) {
      questions = searchQuestions(query)
    } else {
      questions = getQuestions()
    }

    // Filter by category if provided
    if (category) {
      questions = questions.filter((q) => q.categories.includes(category))
    }

    // Filter by answered status if provided
    if (answered === "true") {
      questions = questions.filter((q) => q.answered)
    } else if (answered === "false") {
      questions = questions.filter((q) => !q.answered)
    }

    return NextResponse.json(questions)
  } catch (error) {
    console.error("Error fetching questions:", error)
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 })
  }
}
