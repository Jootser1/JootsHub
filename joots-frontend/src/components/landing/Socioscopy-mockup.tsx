"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/Badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Users, CheckCircle } from "lucide-react"

export default function SocioscopyMockup() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [progress, setProgress] = useState(0)

  const questions = [
    {
      text: "Do you believe remote work is the future?",
      responses: 1247,
      results: { yes: 78, no: 22 },
    },
    {
      text: "What's your biggest motivation in life?",
      responses: 892,
      results: { career: 35, family: 45, personal: 20 },
    },
    {
      text: "How happy are you on a scale of 1-10?",
      responses: 2156,
      results: { average: 7.2, distribution: [2, 5, 8, 12, 18, 25, 30] },
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestion((prev) => (prev + 1) % questions.length)
      setProgress(0)
    }, 4000)

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 2))
    }, 80)

    return () => {
      clearInterval(interval)
      clearInterval(progressInterval)
    }
  }, [])

  const currentQ = questions[currentQuestion]

  return (
    <div className="h-96 bg-gradient-to-br from-purple-50 to-green-50">
      {/* Header */}
      <div className="p-4 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500 rounded-xl">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Socioscopy</h3>
              <p className="text-sm text-gray-500">Discover Insights</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            <TrendingUp className="h-3 w-3 mr-1" />
            Live Results
          </Badge>
        </div>
      </div>

      {/* Question */}
      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <h4 className="font-semibold text-gray-900 text-sm leading-relaxed">{currentQ.text}</h4>
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 ml-2" />
          </div>

          <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
            <Users className="h-3 w-3" />
            <span>{currentQ.responses.toLocaleString()} responses</span>
          </div>

          {/* Results visualization */}
          <div className="space-y-2">
            {currentQuestion === 0 && (
              <>
                <div className="flex justify-between text-sm">
                  <span>Yes</span>
                  <span>{currentQ.results.yes}%</span>
                </div>
                <Progress value={currentQ.results.yes} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>No</span>
                  <span>{currentQ.results.no}%</span>
                </div>
                <Progress value={currentQ.results.no} className="h-2" />
              </>
            )}

            {currentQuestion === 1 && (
              <>
                <div className="flex justify-between text-sm">
                  <span>Career</span>
                  <span>{currentQ.results.career}%</span>
                </div>
                <Progress value={currentQ.results.career} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>Family</span>
                  <span>{currentQ.results.family}%</span>
                </div>
                <Progress value={currentQ.results.family} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>Personal Growth</span>
                  <span>{currentQ.results.personal}%</span>
                </div>
                <Progress value={currentQ.results.personal} className="h-2" />
              </>
            )}

            {currentQuestion === 2 && (
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">{currentQ.results.average}</div>
                <div className="text-sm text-gray-500">Average Happiness Score</div>
                <div className="flex justify-center space-x-1 mt-2">
                  {currentQ.results.distribution.map((height, index) => (
                    <div key={index} className="w-3 bg-purple-400 rounded-t" style={{ height: `${height}px` }}></div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-purple-600">2.1K</div>
            <div className="text-xs text-gray-500">Questions</div>
          </div>
          <div className="bg-white rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-green-600">45K</div>
            <div className="text-xs text-gray-500">Answers</div>
          </div>
          <div className="bg-white rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-blue-600">12K</div>
            <div className="text-xs text-gray-500">Users</div>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-4 left-4 right-4">
        <Progress value={progress} className="h-1" />
      </div>
    </div>
  )
}
