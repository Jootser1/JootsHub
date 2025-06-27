"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Line,
  AreaChart,
  Area,
} from "recharts"

export default function UserAnswers() {
  const [comparisonType, setComparisonType] = useState("network")

  // Colors
  const PURPLE = "#7e22ce"
  const GREEN = "#4ade80"
  const ORANGE = "#fb923c"

  // Mock data for the answers
  const answers = [
    {
      id: 1,
      question: "Croyez-vous en Dieu ?",
      answer: "Oui",
      type: "yes_no",
      data: {
        network: [
          { name: "Oui", value: 65 },
          { name: "Non", value: 25 },
          { name: "Je ne sais pas", value: 10 },
        ],
        demographic: [
          { name: "Oui", value: 72 },
          { name: "Non", value: 18 },
          { name: "Je ne sais pas", value: 10 },
        ],
      },
    },
    {
      id: 2,
      question: "Êtes-vous vraiment heureux ?",
      answer: "7/10",
      type: "metric",
      data: {
        network: [
          { value: 0, count: 2 },
          { value: 1, count: 3 },
          { value: 2, count: 5 },
          { value: 3, count: 8 },
          { value: 4, count: 10 },
          { value: 5, count: 15 },
          { value: 6, count: 20 },
          { value: 7, count: 18 },
          { value: 8, count: 12 },
          { value: 9, count: 5 },
          { value: 10, count: 2 },
        ],
        demographic: [
          { value: 0, count: 1 },
          { value: 1, count: 2 },
          { value: 2, count: 4 },
          { value: 3, count: 6 },
          { value: 4, count: 9 },
          { value: 5, count: 12 },
          { value: 6, count: 18 },
          { value: 7, count: 22 },
          { value: 8, count: 15 },
          { value: 9, count: 8 },
          { value: 10, count: 3 },
        ],
      },
    },
    {
      id: 3,
      question: "Quelle est votre couleur préférée ?",
      answer: "Bleu",
      type: "multiple_choice",
      data: {
        network: [
          { name: "Rouge", value: 25, color: "#ef4444" },
          { name: "Bleu", value: 40, color: "#3b82f6" },
          { name: "Vert", value: 20, color: "#4ade80" },
          { name: "Jaune", value: 10, color: "#facc15" },
          { name: "Autre", value: 5, color: "#7e22ce" },
        ],
        demographic: [
          { name: "Rouge", value: 22, color: "#ef4444" },
          { name: "Bleu", value: 45, color: "#3b82f6" },
          { name: "Vert", value: 18, color: "#4ade80" },
          { name: "Jaune", value: 8, color: "#facc15" },
          { name: "Autre", value: 7, color: "#7e22ce" },
        ],
      },
    },
    {
      id: 4,
      question: "Combien d'heures dormez-vous par nuit ?",
      answer: "7 heures",
      type: "metric",
      data: {
        network: [
          { hours: "4h", count: 5 },
          { hours: "5h", count: 10 },
          { hours: "6h", count: 25 },
          { hours: "7h", count: 35 },
          { hours: "8h", count: 20 },
          { hours: "9h", count: 5 },
        ],
        demographic: [
          { hours: "4h", count: 3 },
          { hours: "5h", count: 8 },
          { hours: "6h", count: 22 },
          { hours: "7h", count: 38 },
          { hours: "8h", count: 24 },
          { hours: "9h", count: 5 },
        ],
      },
    },
    {
      id: 5,
      question: "Utilisez-vous les réseaux sociaux quotidiennement ?",
      answer: "Oui",
      type: "yes_no",
      data: {
        network: [
          { name: "Oui", value: 85 },
          { name: "Non", value: 10 },
          { name: "Je ne sais pas", value: 5 },
        ],
        demographic: [
          { name: "Oui", value: 78 },
          { name: "Non", value: 15 },
          { name: "Je ne sais pas", value: 7 },
        ],
      },
    },
  ]

  // Render the appropriate chart based on question type
  const renderChart = (answer) => {
    const data = answer.data[comparisonType]
    const userAnswer = answer.answer

    switch (answer.type) {
      case "yes_no":
        return (
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.name === userAnswer ? ORANGE : index % 2 === 0 ? PURPLE : GREEN}
                    stroke={entry.name === userAnswer ? ORANGE : "none"}
                    strokeWidth={entry.name === userAnswer ? 3 : 0}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        )

      case "multiple_choice":
        // Special case for color preference question
        if (answer.id === 3) {
          return (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `${value}%`} />
                <Bar dataKey="value">
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke={entry.name === userAnswer ? ORANGE : "none"}
                      strokeWidth={entry.name === userAnswer ? 2 : 0}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )
        } else {
          return (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `${value}%`} />
                <Bar dataKey="value">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === userAnswer ? ORANGE : PURPLE} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )
        }

      case "metric":
        if (answer.id === 2) {
          // Happiness question with green area and orange marker
          return (
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="value" />
                <YAxis />
                <Tooltip />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={GREEN} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={GREEN} stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="count" stroke={PURPLE} fill="url(#colorGradient)" />
                {/* Marker for user's answer */}
                <Line
                  type="monotone"
                  data={[
                    { value: Number.parseInt(userAnswer), count: 0 },
                    { value: Number.parseInt(userAnswer), count: Math.max(...data.map((d) => d.count)) },
                  ]}
                  dataKey="count"
                  stroke={ORANGE}
                  strokeWidth={2}
                  dot={false}
                  activeDot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          )
        } else {
          // Hours of sleep question
          return (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hours" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill={PURPLE}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.hours === userAnswer ? ORANGE : PURPLE} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )
        }

      default:
        return <div>No visualization available</div>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-purple-700">Vos réponses et comparaisons</h2>

        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Comparer avec:</span>
          <Tabs value={comparisonType} onValueChange={setComparisonType} className="w-[300px]">
            <TabsList>
              <TabsTrigger value="network">Mon réseau</TabsTrigger>
              <TabsTrigger value="demographic">Profils similaires</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {answers.map((answer) => (
          <Card key={answer.id}>
            <CardHeader className="bg-purple-50 pb-2">
              <CardTitle className="text-lg text-purple-700">{answer.question}</CardTitle>
              <div className="text-sm text-gray-500">
                Votre réponse: <span className="font-medium text-purple-700">{answer.answer}</span>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              {renderChart(answer)}
              <div className="text-xs text-center text-gray-500 mt-2">
                Comparaison avec {comparisonType === "network" ? "votre réseau" : "des profils similaires"}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
