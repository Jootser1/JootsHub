"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import HeroSection from "@/components/landing/Hero-section"
import FeatureCard from "@/components/landing/Feature-card"
import IcebreakerMockup from "@/components/landing/IceBreaker-mockup"
import SocioscopyMockup from "@/components/landing/Socioscopy-mockup"
import MobileNavigationSection from "@/components/Navigation"
import StatsSection from "@/components/landing/Stats"
import Footer from "@/components/Footer"
import { MessageCircle, BarChart3 } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()

  useEffect(() => {
    // PWA-specific setup
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").then(
          (registration) => {
            console.log("ServiceWorker registration successful with scope: ", registration.scope)
          },
          (err) => {
            console.log("ServiceWorker registration failed: ", err)
          },
        )
      })
    }

    // Prevent zoom on double tap for better mobile experience
    let lastTouchEnd = 0
    document.addEventListener(
      "touchend",
      (event) => {
        const now = new Date().getTime()
        if (now - lastTouchEnd <= 300) {
          event.preventDefault()
        }
        lastTouchEnd = now
      },
      false,
    )

    // Add mobile-specific viewport handling
    const viewport = document.querySelector('meta[name="viewport"]')
    if (viewport) {
      viewport.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no")
    }
  }, [])

  const handleNavigateToIcebreaker = () => {
    // Navigate to Icebreaker feature
    router.push("/icebreaker")
  }

  const handleNavigateToSocioscopy = () => {
    // Navigate to Socioscopy feature
    router.push("/socioscopy")
  }

  return (
<<<<<<< HEAD
    <div className="min-h-screen overflow-x-hidden">
      {/* Mobile Hero Section */}
      <HeroSection />
=======
    <AppLayout>
      <div className='flex-1 flex flex-col p-4 relative'>
        {/* Version mobile : affichage en colonne */}
        <div className='md:hidden h-full overflow-y-auto'>
          <div className='h-full flex flex-col justify-between py-8'>
            {apps.map((app, index) => (
              <div
                key={app.id}
                className={`w-[85%] transform ${index % 2 === 0 ? '-rotate-3' : 'rotate-3'} hover:rotate-0 transition-all duration-300 flex-1 flex items-center justify-center`}
              >
                <div
                  className='bg-white rounded-3xl shadow-2xl p-6 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 relative w-full'
                  onClick={() => app.enabled && router.push(app.path)}
                  style={{
                    background: `linear-gradient(135deg, ${app.color}15 0%, white 100%)`,
                    border: `2px solid ${app.color}30`,
                  }}
                >
                  <div className='flex flex-col items-center'>
                    <div
                      className='w-20 h-20 rounded-2xl mb-4 flex items-center justify-center shadow-lg'
                      style={{ backgroundColor: `${app.color}20` }}
                    >
                      <Image
                        src={app.logo}
                        alt={app.title}
                        width={64}
                        height={64}
                        className='w-16 h-16 object-contain'
                      />
                    </div>
>>>>>>> evolution/new-bdd-schema

      {/* Icebreaker Feature - Mobile optimized */}
      <FeatureCard
        title="Icebreaker"
        subtitle="Connect & Chat"
        description="Break the ice with meaningful conversations. Connect instantly with people who share your interests."
        color="text-blue-500"
        bgColor="bg-blue-50"
        icon={<MessageCircle className="h-6 w-6" />}
        features={[
          "Instant messaging & voice notes",
          "Smart interest-based matching",
          "Group conversations & events",
          "Privacy-first connections",
        ]}
        onExplore={handleNavigateToIcebreaker}
        mockupContent={<IcebreakerMockup />}
      />

      {/* Socioscopy Feature - Mobile optimized */}
      <FeatureCard
        title="Socioscopy"
        subtitle="Discover Insights"
        description="Explore society through questions and polls. Discover fascinating insights about human behavior."
        color="text-purple-500"
        bgColor="bg-purple-50"
        icon={<BarChart3 className="h-6 w-6" />}
        features={[
          "Create polls with multiple formats",
          "Real-time results & analytics",
          "Compare with similar profiles",
          "Trending topics & insights",
        ]}
        onExplore={handleNavigateToSocioscopy}
        mockupContent={<SocioscopyMockup />}
        isReversed={true}
      />

<<<<<<< HEAD
      {/* Mobile Navigation Section */}
      <MobileNavigationSection
        onNavigateToIcebreaker={handleNavigateToIcebreaker}
        onNavigateToSocioscopy={handleNavigateToSocioscopy}
      />
=======
                    <div className='aspect-video bg-white rounded-xl flex items-center justify-center overflow-hidden'>
                      <div
                        className='text-4xl md:text-5xl font-bold transform transition-all duration-300 hover:scale-110'
                        style={{ color: app.color }}
                      >
                        <Image
                          src={app.logo}
                          alt={app.title}
                          width={64}
                          height={64}
                          className='w-16'
                          style={{ height: "auto" }}
                        />
                      </div>
                    </div>
>>>>>>> evolution/new-bdd-schema

      {/* Mobile Stats Section */}
      <StatsSection />

      {/* Footer */}
      <Footer />

    </div>
  )
}
