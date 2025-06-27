"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/card"
import { MessageCircle, BarChart3, ArrowRight, Sparkles, Smartphone } from "lucide-react"

interface MobileNavigationSectionProps {
  onNavigateToIcebreaker: () => void
  onNavigateToSocioscopy: () => void
}

export default function MobileNavigationSection({
  onNavigateToIcebreaker,
  onNavigateToSocioscopy,
}: MobileNavigationSectionProps) {
  const [activeCard, setActiveCard] = useState<string | null>(null)

  const handleCardTouch = (cardType: string, action: () => void) => {
    setActiveCard(cardType)
    setTimeout(() => {
      setActiveCard(null)
      action()
    }, 200)
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-5 w-5 text-purple-500" />
            <span className="text-sm font-semibold uppercase tracking-wider text-purple-500">Choose Your Path</span>
            <Sparkles className="h-5 w-5 text-purple-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Two Experiences, One App</h2>
          <p className="text-lg text-gray-600 max-w-sm mx-auto">
            Tap to explore either feature or switch between both anytime.
          </p>
        </div>

        <div className="space-y-6 max-w-sm mx-auto">
          {/* Icebreaker Card - Mobile optimized */}
          <Card
            className={`relative overflow-hidden cursor-pointer transition-all duration-300 transform ${
              activeCard === "icebreaker" ? "scale-95" : "active:scale-95"
            }`}
            onTouchStart={() => setActiveCard("icebreaker")}
            onTouchEnd={() => handleCardTouch("icebreaker", onNavigateToIcebreaker)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-400"></div>
            <div className="relative z-10 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Icebreaker</h3>
                    <p className="text-blue-100 text-sm">Connect & Chat</p>
                  </div>
                </div>
                <Smartphone className="h-6 w-6 text-white/60" />
              </div>

              <p className="text-blue-100 mb-4 text-sm leading-relaxed">
                Connect with like-minded people and spark meaningful conversations
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  <span className="text-blue-100 text-sm">Real-time messaging</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  <span className="text-blue-100 text-sm">Smart matching</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  <span className="text-blue-100 text-sm">Community building</span>
                </div>
              </div>

              <Button
                variant="secondary"
                className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 rounded-xl"
              >
                Start Connecting
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Touch indicator */}
            <div className="absolute top-3 right-3 w-6 h-6 bg-white/10 rounded-full animate-pulse"></div>
          </Card>

          {/* Socioscopy Card - Mobile optimized */}
          <Card
            className={`relative overflow-hidden cursor-pointer transition-all duration-300 transform ${
              activeCard === "socioscopy" ? "scale-95" : "active:scale-95"
            }`}
            onTouchStart={() => setActiveCard("socioscopy")}
            onTouchEnd={() => handleCardTouch("socioscopy", onNavigateToSocioscopy)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-400"></div>
            <div className="relative z-10 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Socioscopy</h3>
                    <p className="text-purple-100 text-sm">Discover Insights</p>
                  </div>
                </div>
                <Smartphone className="h-6 w-6 text-white/60" />
              </div>

              <p className="text-purple-100 mb-4 text-sm leading-relaxed">
                Explore society through questions and discover collective insights
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  <span className="text-purple-100 text-sm">Create & answer polls</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  <span className="text-purple-100 text-sm">Real-time analytics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  <span className="text-purple-100 text-sm">Social insights</span>
                </div>
              </div>

              <Button
                variant="secondary"
                className="w-full bg-white text-purple-600 hover:bg-purple-50 font-semibold py-3 rounded-xl"
              >
                Discover Insights
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Touch indicator */}
            <div className="absolute top-3 right-3 w-6 h-6 bg-white/10 rounded-full animate-pulse delay-100"></div>
          </Card>
        </div>

        {/* Bottom info */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm mb-4">Switch between features anytime in the app</p>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
}