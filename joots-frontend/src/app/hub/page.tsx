"use client";

import { useEffect, useState, TouchEvent } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useStore } from "@/app/store/store"

const apps = [
  {
    id: "icebreaker",
    title: "Icebreaker",
    description: "Un inconnu, des questions, un conversation sans préjugés. Chaque discussion est une rencontre, chaque rencontre une surprise !",
    color: "#E59C45",
    enabled: true,
    path: "/icebreaker",
    logo: "/icebreaker_oo.png",
  },
  {
    id: "socioscopy",
    title: "Socioscopy",
    description: "Découvrez ce que les autres pensent vraiment, challengez vos certitudes et ouvrez le débat",
    color: "#5211CE",
    enabled: false,
    path: "/socioscopy/landing",
    logo: "/socioscopy.png",
  },
  {
    id: "revelio",
    title: "Revelio",
    description: "Vous croyez bien connaître vos proches ? Défiez-les et voyez si vous aviez raison !",
    color: "#3CBF77",
    enabled: false,
    path: "/revelio/landing",
    logo: "/revelio.png",
  },
]

export default function HubPage() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const [currentApp, setCurrentApp] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState(0);
  const [offset, setOffset] = useState(apps.length); // Offset pour centrer sur le groupe du milieu
  const router = useRouter();

  const resetPositionSilently = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      // Désactiver la transition
      const carousel = document.querySelector('.carousel-container') as HTMLElement;
      if (carousel) {
        carousel.style.transition = 'none';
      }
      
      // Réinitialiser à la position centrale
      setOffset(apps.length);
      
      // Réactiver la transition après un bref délai
      setTimeout(() => {
        if (carousel) {
          carousel.style.transition = 'transform 500ms ease-in-out';
        }
        setIsTransitioning(false);
        setDirection(0);
      }, 50);
    }, 500);
  };

  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(-1);
    
    if (currentApp <= 0) {
      setCurrentApp(apps.length - 1);
      setOffset(offset - 1);
      resetPositionSilently();
    } else {
      setCurrentApp(currentApp - 1);
      setOffset(offset - 1);
      setTimeout(() => {
        setIsTransitioning(false);
        setDirection(0);
      }, 500);
    }
  }

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection(1);
    
    if (currentApp >= apps.length - 1) {
      setCurrentApp(0);
      setOffset(offset + 1);
      resetPositionSilently();
    } else {
      setCurrentApp(currentApp + 1);
      setOffset(offset + 1);
      setTimeout(() => {
        setIsTransitioning(false);
        setDirection(0);
      }, 500);
    }
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
    if (isTransitioning) return;
    setTouchEnd(e.touches[0].clientX);
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || isTransitioning) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) < minSwipeDistance) {
      setTouchStart(0);
      setTouchEnd(0);
      return;
    }

    if (distance > 0) {
      handleNext();
    } else {
      handlePrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  }

  const getTranslateX = () => {
    const baseTranslation = -((offset - apps.length) * 100);
    const touchOffset = touchEnd ? (touchStart - touchEnd) : 0;
    return `calc(${baseTranslation}% - ${touchOffset}px)`;
  }

  if (status === "loading") {
    return <p>Chargement...</p>;
  }

  return (
    <Layout>
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative overflow-hidden touch-pan-y">
        <div 
          className="carousel-container max-w-4xl w-full transition-transform duration-500 ease-in-out transform"
          style={{ 
            transform: `translateX(${getTranslateX()})`,
            transition: touchEnd ? 'none' : 'transform 500ms ease-in-out'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex">
            {[...apps, ...apps, ...apps].map((app, index) => (
              <div
                key={`${app.id}-${index}`}
                className={`w-full flex-shrink-0 px-4 md:px-8 transform transition-all duration-500 ${
                  index % apps.length === currentApp
                    ? 'scale-100 opacity-100' 
                    : 'scale-95 opacity-50'
                }`}
              >
                {/* Début de la carte d'application avec ombre et espacement adaptatif */}
                <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 space-y-4 md:space-y-6">
                  <h2 
                    className="text-3xl md:text-4xl font-bold text-center"
                    style={{ color: app.color }}
                  >
                    {app.title}
                  </h2>
                  <p className="text-lg md:text-xl text-gray-600 text-center">
                    {app.description}
                  </p>

                  <div className="aspect-video bg-white rounded-xl flex items-center justify-center overflow-hidden">
                    <div 
                      className="text-4xl md:text-5xl font-bold transform transition-all duration-300 hover:scale-110"
                      style={{ color: app.color }}
                    >
                      <img src={app.logo} alt={app.title} className="w-16" />
                    </div>
                  </div>

                  

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