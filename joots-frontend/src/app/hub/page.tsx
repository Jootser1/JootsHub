"use client";
import { useEffect, useState, TouchEvent } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const apps = [
  {
    id: "socioscopy",
    title: "Socioscopy",
    description: "Découvrez ce que pensent les autres et comparez vos idées.",
    color: "#5211CE",
    enabled: false,
    path: "/socioscopy/landing",
  },
  {
    id: "icebreaker",
    title: "Icebreaker",
    description: "Un inconnu, des questions, un conversation sans préjugés.",
    color: "#E59C45",
    enabled: true,
    path: "/icebreaker/landing",
  },
  {
    id: "revelio",
    title: "Revelio",
    description: "Défiez vos amis et voyez si vous les connaissez vraiment !",
    color: "#3CBF77",
    enabled: false,
    path: "/revelio/landing",
  },
]

export default function HubPage() {
  const { status } = useSession();
  const [currentApp, setCurrentApp] = useState(1);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const router = useRouter();

  const handlePrevious = () => {
    setCurrentApp((prev) => (prev === 0 ? apps.length - 1 : prev - 1));
  }

  const handleNext = () => {
    setCurrentApp((prev) => (prev === apps.length - 1 ? 0 : prev + 1));
  }

  const handleStart = () => {
    const app = apps[currentApp];
    if (app.enabled) {
      router.push(app.path);
    }
  }

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  }

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
      handleNext();
    } else {
      handlePrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  }

  useEffect(() => {
    // Effets secondaires si nécessaire
  }, [currentApp, router]);

  if (status === "loading") {
    return <p>Chargement...</p>;
  }

  return (
    <Layout>
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden touch-pan-y">
        <div 
          className="max-w-4xl w-full transition-transform duration-500 ease-out will-change-transform"
          style={{ transform: `translateX(-${currentApp * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex">
            {apps.map((app, index) => (
              <div
                key={app.id}
                className={`w-full flex-shrink-0 px-4 md:px-8 transform transition-all duration-500 ${
                  index === currentApp 
                    ? 'scale-100 opacity-100' 
                    : 'scale-95 opacity-50'
                }`}
              >
                <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 space-y-4 md:space-y-6">
                  <h2 
                    className="text-3xl md:text-4xl font-bold text-center"
                    style={{ color: app.color }}
                  >
                  </h2>

                  <div className="aspect-video bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">
                    <div 
                      className="text-4xl md:text-5xl font-bold transform transition-all duration-300 hover:scale-110"
                      style={{ color: app.color }}
                    >
                      {app.title}
                    </div>
                  </div>

                  <p className="text-lg md:text-xl text-gray-600 text-center">
                    {app.description}
                  </p>

                  <div className="flex justify-center">
                    <Button
                      onClick={handleStart}
                      disabled={!app.enabled}
                      className="w-full md:w-auto px-6 md:px-8 py-3 text-lg font-semibold rounded-xl transform transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                      style={{
                        backgroundColor: app.enabled ? app.color : '#999999',
                        color: 'white',
                      }}
                    >
                      {app.enabled ? "Commencer" : "Bientôt disponible"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicateurs de navigation uniquement visibles sur desktop */}
        <div className="hidden md:flex absolute top-1/2 left-4 z-10">
          <button
            onClick={handlePrevious}
            className="transform -translate-y-1/2 p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            aria-label="Application précédente"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </div>

        <div className="hidden md:flex absolute top-1/2 right-4 z-10">
          <button
            onClick={handleNext}
            className="transform -translate-y-1/2 p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            aria-label="Application suivante"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Indicateurs de pagination */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {apps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentApp(index)}
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentApp 
                  ? 'bg-gray-800 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Aller à l'application ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
}