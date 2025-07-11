"use client"

import { useState } from "react"
import { Search, Check, Grid3X3, ChevronDown, ChevronUp, PlusCircle } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useRouter } from "next/navigation"
import type { Category } from "@/lib/types"

interface SearchPanelProps {
  categories: Category[]
}

export default function SearchPanel({ categories }: SearchPanelProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleFilterClick = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter)
  }

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const handleCreateQuestion = () => {
    router.push("/questions/create")
  }

  return (
    <div>
      <h2 className="text-4xl font-bold text-purple-700 mb-8">RECHERCHE</h2>

      <div className="mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="RECHERCHE PARMI LES QUESTIONS..."
            className="pl-10 bg-gray-200 border-0 h-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-500 mb-2">FILTRER :</p>

        <Button
          variant={activeFilter === "my-questions" ? "default" : "outline"}
          className={`w-full justify-start mb-3 h-14 ${
            activeFilter === "my-questions"
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-green-100 text-green-500 hover:bg-green-200"
          }`}
          onClick={() => handleFilterClick("my-questions")}
        >
          <div className="bg-green-500 rounded-full p-1 mr-3">
            <Search className="h-5 w-5 text-white" />
          </div>
          MES QUESTIONS
        </Button>

        <Button
          variant={activeFilter === "my-answers" ? "default" : "outline"}
          className={`w-full justify-start mb-3 h-14 ${
            activeFilter === "my-answers"
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-green-100 text-green-500 hover:bg-green-200"
          }`}
          onClick={() => handleFilterClick("my-answers")}
        >
          <div className="bg-green-500 rounded-full p-1 mr-3">
            <Check className="h-5 w-5 text-white" />
          </div>
          MES RÉPONSES
        </Button>

        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
          <CollapsibleTrigger asChild>
            <Button
              variant={activeFilter === "categories" ? "default" : "outline"}
              className={`w-full justify-between mb-3 h-14 ${
                activeFilter === "categories"
                  ? "bg-purple-700 hover:bg-purple-800 text-white"
                  : "bg-purple-700 text-white hover:bg-purple-800"
              }`}
              onClick={() => handleFilterClick("categories")}
            >
              <div className="flex items-center">
                <div className="bg-white rounded-md p-1 mr-3">
                  <Grid3X3 className="h-5 w-5 text-purple-700" />
                </div>
                CATÉGORIES
              </div>
              {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="bg-white p-4 rounded-md shadow-sm">
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={category.id}
                    className="mr-2"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                  />
                  <label htmlFor={category.id}>{category.name}</label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <Button onClick={handleCreateQuestion} className="w-full bg-purple-700 hover:bg-purple-800 text-white h-14 mb-8">
        <PlusCircle className="mr-2 h-5 w-5" />
        CRÉER UNE QUESTION
      </Button>

      <div className="mt-12">
        <div className="flex items-center mb-2">
          <div className="text-purple-600 mr-2">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-600 border-t-transparent"></div>
          </div>
          <span className="text-purple-600 text-sm">Votre question est en cours de validation</span>
        </div>
        <div className="flex items-center mb-2">
          <div className="text-green-500 mr-2">
            <Check className="h-5 w-5" />
          </div>
          <span className="text-green-500 text-sm">Votre question a été validé</span>
        </div>
        <div className="flex items-center">
          <div className="text-yellow-500 mr-2">
            <div className="h-5 w-5 rounded-full border-2 border-yellow-500 flex items-center justify-center">
              <span className="text-yellow-500 text-xs">!</span>
            </div>
          </div>
          <span className="text-yellow-500 text-sm">Votre question a été refusé</span>
        </div>
      </div>
    </div>
  )
}
