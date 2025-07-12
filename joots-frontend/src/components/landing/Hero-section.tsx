"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { ArrowDown, Download, Smartphone, Zap, Users, MessageCircle, BarChart3 } from "lucide-react"
import Image from "next/image"

export default function HeroSection() {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

  const features = [
    { icon: MessageCircle, text: "Connect Instantly", color: "text-blue-400" },
    { icon: BarChart3, text: "Discover Insights", color: "text-purple-400" },
    { icon: Users, text: "Build Community", color: "text-orange-400" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 2500)

    // PWA install prompt handling
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    return () => {
      clearInterval(interval)
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      console.log(`User response to the install prompt: ${outcome}`)
      setDeferredPrompt(null)
      setShowInstallPrompt(false)
    }
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-purple-600 via-blue-600 to-orange-500 overflow-hidden">
      {/* Mobile-optimized background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-4 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-32 right-6 w-16 h-16 bg-white/5 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-8 w-12 h-12 bg-white/15 rounded-full animate-ping"></div>
        <div className="absolute bottom-24 right-4 w-14 h-14 bg-white/10 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen text-center">
        {/* Mobile app icon */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto mb-4 relative bg-white/20 rounded-3xl p-4 backdrop-blur-sm">
            <Image
              src="/images/questions-logo.png"
              alt="Joots Logo"
              width={48}
              height={48}
              className="object-contain filter brightness-0 invert"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tight">JOOTS</h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-sm mx-auto leading-relaxed">
            The social app that connects & discovers
          </p>
        </div>

        {/* Mobile feature showcase */}
        <div className="mb-8 h-16 flex items-center justify-center">
          <div className="flex items-center space-x-3 text-white">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className={`flex flex-col items-center transition-all duration-500 ${
                    index === currentFeature ? "opacity-100 scale-110" : "opacity-40 scale-90"
                  }`}
                >
                  <Icon className={`h-6 w-6 ${feature.color} mb-1`} />
                  <span className="text-sm font-semibold">{feature.text}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* PWA Install prompt */}
        {showInstallPrompt && (
          <div className="mb-6 p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30">
            <div className="flex items-center space-x-3 text-white mb-3">
              <Smartphone className="h-5 w-5" />
              <span className="font-semibold">Install Joots App</span>
            </div>
            <p className="text-white/80 text-sm mb-3">Get the full experience with our mobile app</p>
            <Button
              onClick={handleInstallApp}
              className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold rounded-xl"
            >
              <Download className="mr-2 h-4 w-4" />
              Install App
            </Button>
          </div>
        )}

        {/* Mobile CTA Buttons */}
        <div className="flex flex-col gap-4 mb-12 w-full max-w-sm">
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-4 text-lg font-semibold rounded-2xl shadow-2xl transform active:scale-95 transition-all duration-200"
          >
            <Zap className="mr-2 h-5 w-5" />
            Start Your Journey
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-6 py-4 text-lg font-semibold rounded-2xl shadow-2xl transform active:scale-95 transition-all duration-200"
          >
            Explore Features
          </Button>
        </div>

        {/* Mobile scroll indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center text-white/80">
            <span className="text-sm mb-2">Swipe up to explore</span>
            <ArrowDown className="h-5 w-5" />
          </div>
        </div>
      </div>
    </section>
  )
}
