import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, BarChart2 } from "lucide-react"
import Link from "next/link"

export default function UserQuestions() {
  // Mock data for user questions
  const questions = [
    {
      id: 1,
      text: "Préférez-vous travailler à distance ou au bureau ?",
      type: "multiple_choice",
      responses: 42,
      date: "12/05/2023",
    },
    {
      id: 2,
      text: "Combien de livres lisez-vous par an ?",
      type: "metric",
      responses: 37,
      date: "03/04/2023",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-purple-700">Vos questions créées</h2>

        <Button className="bg-purple-700 hover:bg-purple-800">
          <PlusCircle className="mr-2 h-4 w-4" />
          Créer une question
        </Button>
      </div>

      {questions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {questions.map((question) => (
            <Card key={question.id}>
              <CardHeader className="bg-purple-50 pb-2">
                <CardTitle className="text-lg text-purple-700">{question.text}</CardTitle>
                <div className="text-sm text-gray-500">
                  Type: {question.type === "multiple_choice" ? "Choix multiples" : "Métrique"}
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm text-gray-500">Créée le {question.date}</div>
                    <div className="text-sm text-gray-500">{question.responses} réponses</div>
                  </div>
                  <Button variant="outline" className="border-purple-700 text-purple-700">
                    <BarChart2 className="mr-2 h-4 w-4" />
                    Voir les résultats
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500 mb-4">Vous n'avez pas encore créé de questions.</p>
            <Button asChild className="bg-purple-700 hover:bg-purple-800">
              <Link href="/questions/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Créer ma première question
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
