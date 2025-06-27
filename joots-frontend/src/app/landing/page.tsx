"use client"

import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useState } from "react"
import HeroSection from "@/components/landing/Hero-section"
import FeatureCard from "@/components/landing/Feature-card"
import IcebreakerMockup from "@/components/landing/IceBreaker-mockup"
import SocioscopyMockup from "@/components/landing/Socioscopy-mockup"
import StatsSection from "@/components/landing/Stats"
import Footer from "@/components/Footer"
import { MessageCircle, BarChart3 } from "lucide-react"
import LoginModal from "@/components/LoginModal"

export default function LandingPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [showLogin, setShowLogin] = useState(false)
  const [pendingRoute, setPendingRoute] = useState<string | null>(null)

  const handleProtectedNavigate = (route: string) => {
    if (session?.user) {
      router.push(route)
    } else {
      setPendingRoute(route)
      setShowLogin(true)
    }
  }

  const handleLoginSuccess = () => {
    setShowLogin(false)
    if (pendingRoute) {
      router.push(pendingRoute)
      setPendingRoute(null)
    }
  }


  const handleNavigateToIcebreaker = () => {
    router.push("/icebreaker")
  }

  const handleNavigateToSocioscopy = () => {
    router.push("/socioscopy")
  }

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* Icebreaker Feature */}
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
        onExplore={() => handleProtectedNavigate(`/icebreaker/${session?.user?.id ?? ""}`)}
        mockupContent={<IcebreakerMockup />}
      />

      {/* Socioscopy Feature */}
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
        onExplore={() => handleProtectedNavigate(`/questions/${session?.user?.id ?? ""}`)}
        mockupContent={<SocioscopyMockup />}
        isReversed={true}
      />

      {/* Stats Section */}
      <StatsSection />

      {/* Footer */}
      <Footer />
    </div>
  )
} 