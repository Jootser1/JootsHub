"use client"

import { useState, useEffect, useRef } from "react"
import { Users, MessageSquare, BarChart, Globe } from "lucide-react"

export default function MobileStatsSection() {
  const [counts, setCounts] = useState({
    users: 0,
    messages: 0,
    questions: 0,
    countries: 0,
  })
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const finalCounts = {
    users: 12547,
    messages: 89234,
    questions: 2156,
    countries: 47,
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          startCounting()
        }
      },
      { threshold: 0.5 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  const startCounting = () => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps

    const intervals = Object.keys(finalCounts).map((key) => {
      const finalValue = finalCounts[key as keyof typeof finalCounts]
      const increment = finalValue / steps

      return setInterval(() => {
        setCounts((prev) => ({
          ...prev,
          [key]: Math.min(prev[key as keyof typeof prev] + increment, finalValue),
        }))
      }, stepDuration)
    })

    setTimeout(() => {
      intervals.forEach(clearInterval)
      setCounts(finalCounts)
    }, duration)
  }

  const stats = [
    {
      icon: Users,
      value: Math.floor(counts.users).toLocaleString(),
      label: "Active Users",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: MessageSquare,
      value: Math.floor(counts.messages).toLocaleString(),
      label: "Messages",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      icon: BarChart,
      value: Math.floor(counts.questions).toLocaleString(),
      label: "Questions",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: Globe,
      value: Math.floor(counts.countries).toString(),
      label: "Countries",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <section className="py-12 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Growing Community</h2>
          <p className="text-gray-600">Join thousands of people connecting daily</p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className={`text-center p-4 rounded-2xl transition-all duration-500 transform ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className={`text-2xl font-black ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Mobile testimonial */}
        <div className="mt-8 text-center">
          <div className="bg-gray-50 rounded-2xl p-4 max-w-sm mx-auto">
            <p className="text-gray-600 text-sm italic mb-2">
              "Joots changed how I connect with people. It's like having a social superpower!"
            </p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                S
              </div>
              <span className="text-gray-700 text-sm font-medium">Sophie, Paris</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
