import type { Metadata } from "next"
import CreateQuestionForm from "@/components/questions/create-question-form"

export const metadata: Metadata = {
  title: "Créer une question | Poll App",
  description: "Créez une nouvelle question pour la communauté",
}

export default function CreateQuestionPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 max-w-4xl">
      <CreateQuestionForm />
    </div>
  )
}
