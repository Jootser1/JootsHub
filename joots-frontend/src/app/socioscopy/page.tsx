import type { Metadata } from "next"
import QuestionsList from "@/components/questions/questions-list"
import SearchPanel from "@/components/questions/search-panel"
import MobileNav from "@/components/Navigation"
import type { Question } from "@/lib/types"

export const metadata: Metadata = {
  title: "Polls | Joots",
  description: "Browse and search polls",
}

export default function QuestionsPage() {
  // In a real app, you would fetch this data from your PostgreSQL database
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
      answered: false,
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
      text: "Croyez-vous en Dieu ?",
      answered: false,
      categories: ["religion", "home"],
      type: "yes_no",
      owner: { type: "app" },
    },
    {
      id: 5,
      text: "Vous rongez-vous les ongles ?",
      answered: false,
      categories: ["habits", "psychology"],
      type: "yes_no",
      owner: { type: "app" },
    },
    {
      id: 6,
      text: "Êtes-vous vraiment heureux ?",
      answered: false,
      categories: ["psychology", "science"],
      type: "metric",
      metricRange: {
        min: 0,
        max: 10,
        step: 1,
      },
      owner: { type: "user", username: "Marc" },
    },
    {
      id: 7,
      text: "Croyez-vous en Dieu ?",
      answered: false,
      categories: ["religion", "home"],
      type: "yes_no",
      owner: { type: "app" },
    },
    {
      id: 8,
      text: "Vous rongez-vous les ongles ?",
      answered: false,
      categories: ["habits", "science"],
      type: "yes_no",
      owner: { type: "app" },
    },
    {
      id: 9,
      text: "Êtes vous vraiment heureux ?",
      answered: false,
      categories: ["psychology", "justice"],
      type: "metric",
      metricRange: {
        min: 0,
        max: 10,
        step: 1,
      },
      owner: { type: "user", username: "Julie" },
    },
    {
      id: 10,
      text: "Quelle est votre couleur préférée ?",
      answered: true,
      categories: ["preferences"],
      type: "multiple_choice",
      options: ["Rouge", "Bleu", "Vert", "Jaune", "Autre"],
      owner: { type: "user", username: "Thomas" },
    },
    {
      id: 11,
      text: "Vous rongez-vous les ongles ?",
      answered: true,
      categories: ["habits", "science"],
      type: "yes_no",
      owner: { type: "app" },
    },
    {
      id: 12,
      text: "Êtes-vous vraiment heureux ?",
      answered: true,
      categories: ["psychology", "science"],
      type: "metric",
      metricRange: {
        min: 0,
        max: 10,
        step: 1,
      },
      owner: { type: "user", username: "Emma" },
    },
    {
      id: 13,
      text: "Vous rongez-vous les ongles ?",
      answered: false,
      categories: ["habits", "science"],
      type: "yes_no",
      owner: { type: "app" },
    },
  ]

  const categories = [
    { id: "religion", name: "Religion", icon: "check" },
    { id: "philosophy", name: "Philosophie", icon: "star" },
    { id: "psychology", name: "Psychologie", icon: "activity" },
    { id: "habits", name: "Habitudes", icon: "users" },
    { id: "wellbeing", name: "Bien-être", icon: "smile" },
    { id: "home", name: "Maison", icon: "home" },
    { id: "science", name: "Science", icon: "atom" },
    { id: "justice", name: "Justice", icon: "scale" },
    { id: "preferences", name: "Préférences", icon: "heart" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 container mx-auto p-4 pb-20 md:p-6">
        {/* Mobile view: Tab navigation for switching between questions and search */}
        <div className="md:hidden mb-4 flex rounded-lg overflow-hidden border border-gray-200">
          <button className="flex-1 py-3 bg-purple-700 text-white font-medium">Questions</button>
          <button className="flex-1 py-3 bg-white text-gray-600 font-medium">Recherche</button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3 bg-white rounded-lg shadow-sm p-4 md:p-6">
            <QuestionsList questions={questions} />
          </div>
          <div className="w-full md:w-1/3 bg-gray-100 rounded-lg shadow-sm p-4 md:p-6 hidden md:block">
            <SearchPanel categories={categories} />
          </div>
        </div>
      </main>

      {/* Mobile footer - hidden on desktop */}
      <footer className="bg-purple-700 text-white p-4 hidden md:block">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>FR / EN</span>
            <a href="#" className="hover:underline">
              Mentions légales
            </a>
            <a href="#" className="hover:underline">
              Conditions d'utilisations
            </a>
            <a href="#" className="hover:underline">
              Charte de confidentialité
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span>CONTACTEZ-NOUS</span>
            <a href="#" aria-label="Facebook">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* Mobile navigation */}
      
    </div>
  )
}
