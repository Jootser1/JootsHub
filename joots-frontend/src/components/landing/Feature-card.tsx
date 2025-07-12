"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Play } from "lucide-react"

interface MobileFeatureCardProps {
  title: string
  subtitle: string
  description: string
  color: string
  bgColor: string
  icon: React.ReactNode
  features: string[]
  onExplore: () => void
  mockupContent: React.ReactNode
  isReversed?: boolean
}

export default function FeatureCard({
  title,
  subtitle,
  description,
  color,
  bgColor,
  icon,
  features,
  onExplore,
  mockupContent,
  isReversed = false,
}: MobileFeatureCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe || isRightSwipe) {
      // Handle swipe gestures if needed
      console.log(isLeftSwipe ? "Swiped left" : "Swiped right")
    }
  }

  return (
    <section className={`py-12 ${bgColor}`} ref={cardRef}>
      <div className="container mx-auto px-4">
        <div className="space-y-8">
          {/* Mobile-first layout */}
          <div
            className={`transform transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
          >
            {/* Header */}
            <div className="text-center space-y-4 mb-8">
              <div className="flex items-center justify-center space-x-3">
                <div className={`p-3 rounded-2xl ${color} bg-white shadow-lg`}>{icon}</div>
                <span className={`text-sm font-semibold uppercase tracking-wider ${color}`}>{subtitle}</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">{title}</h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-md mx-auto">{description}</p>
            </div>

            {/* Mobile mockup */}
            <div className="flex justify-center mb-8">
              <Card
                className="w-full max-w-sm bg-white shadow-2xl rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-500"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {mockupContent}
              </Card>
            </div>

            {/* Features list - mobile optimized */}
            <div className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-3 rounded-xl bg-white/50 transform transition-all duration-500 delay-${index * 100}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-3 h-3 rounded-full ${color.replace("text-", "bg-")}`}></div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* Mobile CTA Button */}
            <div className="text-center">
              <Button
                onClick={onExplore}
                size="lg"
                className={`${color.replace("text-", "bg-")} hover:opacity-90 px-8 py-4 text-lg font-semibold rounded-2xl shadow-xl transform active:scale-95 transition-all duration-200 w-full max-w-sm`}
              >
                <Play className="mr-2 h-5 w-5" />
                Try {title}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
