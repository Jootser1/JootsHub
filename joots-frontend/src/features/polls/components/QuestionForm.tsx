"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Plus, Trash2, CheckCircle2 } from "lucide-react"
import Image from "next/image"
import type { QuestionType } from "@/lib/types"

export default function CreateQuestionForm() {
  const router = useRouter()
  const [questionText, setQuestionText] = useState("")
  const [questionType, setQuestionType] = useState<QuestionType>("yes_no")
  const [options, setOptions] = useState<string[]>(["", ""])
  const [metricMin, setMetricMin] = useState(0)
  const [metricMax, setMetricMax] = useState(10)
  const [metricStep, setMetricStep] = useState(1)
  const [metricMinLabel, setMetricMinLabel] = useState("")
  const [metricMaxLabel, setMetricMaxLabel] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock categories - in a real app, these would come from the database
  const categories = [
    { id: "religion", name: "Religion" },
    { id: "philosophy", name: "Philosophie" },
    { id: "psychology", name: "Psychologie" },
    { id: "habits", name: "Habitudes" },
    { id: "wellbeing", name: "Bien-être" },
    { id: "preferences", name: "Préférences" },
    { id: "science", name: "Science" },
    { id: "justice", name: "Justice" },
  ]

  const handleAddOption = () => {
    setOptions([...options, ""])
  }

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index))
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const handleSubmit = async () => {
    if (!questionText || selectedCategories.length === 0) return

    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to save the question
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to the questions page
      router.push("/questions")
    } catch (error) {
      console.error("Error creating question:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoBack = () => {
    router.back()
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
            <CardTitle className="text-2xl text-purple-700">Créer une nouvelle question</CardTitle>
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
        </CardHeader>
        <CardContent className="pt-6 space-y-8">
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-purple-700">Texte de la question</h3>
            <Textarea
              id="question-text"
              placeholder="Saisissez votre question ici..."
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-700">Type de question</h3>
            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                onClick={() => setQuestionType("yes_no")}
                className={`px-6 py-3 rounded-md ${
                  questionType === "yes_no"
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {questionType === "yes_no" && <CheckCircle2 className="mr-2 h-4 w-4" />}
                Oui / Non
              </Button>
              <Button
                type="button"
                onClick={() => setQuestionType("multiple_choice")}
                className={`px-6 py-3 rounded-md ${
                  questionType === "multiple_choice"
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {questionType === "multiple_choice" && <CheckCircle2 className="mr-2 h-4 w-4" />}
                Choix multiples
              </Button>
              <Button
                type="button"
                onClick={() => setQuestionType("metric")}
                className={`px-6 py-3 rounded-md ${
                  questionType === "metric"
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {questionType === "metric" && <CheckCircle2 className="mr-2 h-4 w-4" />}
                Échelle métrique
              </Button>
            </div>
          </div>

          {questionType === "multiple_choice" && (
            <div className="space-y-4 border-t pt-4">
              <h3 className="text-xl font-semibold text-purple-700">Options de réponse</h3>
              {options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    className="flex-1"
                  />
                  {options.length > 2 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveOption(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" onClick={handleAddOption} className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Ajouter une option
              </Button>
            </div>
          )}

          {questionType === "metric" && (
            <div className="space-y-4 border-t pt-4">
              <h3 className="text-xl font-semibold text-purple-700">Configuration de l'échelle</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-purple-700 font-medium mb-2">Minimum</p>
                  <Input
                    id="metric-min"
                    type="number"
                    value={metricMin}
                    onChange={(e) => setMetricMin(Number.parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <p className="text-purple-700 font-medium mb-2">Maximum</p>
                  <Input
                    id="metric-max"
                    type="number"
                    value={metricMax}
                    onChange={(e) => setMetricMax(Number.parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <p className="text-purple-700 font-medium mb-2">Pas</p>
                  <Input
                    id="metric-step"
                    type="number"
                    value={metricStep}
                    onChange={(e) => setMetricStep(Number.parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-purple-700 font-medium mb-2">Libellé minimum (optionnel)</p>
                  <Input
                    id="metric-min-label"
                    value={metricMinLabel}
                    onChange={(e) => setMetricMinLabel(e.target.value)}
                    placeholder="Ex: Pas du tout"
                  />
                </div>
                <div>
                  <p className="text-purple-700 font-medium mb-2">Libellé maximum (optionnel)</p>
                  <Input
                    id="metric-max-label"
                    value={metricMaxLabel}
                    onChange={(e) => setMetricMaxLabel(e.target.value)}
                    placeholder="Ex: Extrêmement"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4 border-t pt-4">
            <h3 className="text-xl font-semibold text-purple-700">Catégories (sélectionnez au moins une)</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => handleCategoryToggle(category.id)}
                  />
                  <label htmlFor={`category-${category.id}`} className="text-purple-700">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end border-t bg-gray-50 p-4">
          <Button
            onClick={handleSubmit}
            disabled={!questionText || selectedCategories.length === 0 || isSubmitting}
            className="bg-purple-700 hover:bg-purple-800"
          >
            {isSubmitting ? "Création en cours..." : "Créer la question"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
