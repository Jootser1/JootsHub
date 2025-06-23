'use client'

import { useState, TouchEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { AppLayout } from '@/components/AppLayout'
import { Button } from '@/components/ui/Button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const apps = [
  {
    id: 'icebreaker',
    title: 'Icebreaker',
    description:
      'Un inconnu, des questions, un conversation sans préjugés. Chaque discussion est une rencontre, chaque rencontre une surprise !',
    color: '#E59C45',
    enabled: true,
    path: '/icebreaker',
    logo: '/icebreaker_oo.png',
  },
  {
    id: 'socioscopy',
    title: 'Socioscopy',
    description:
      'Découvrez ce que les autres pensent vraiment, challengez vos certitudes et ouvrez le débat',
    color: '#5211CE',
    enabled: false,
    path: '/socioscopy/landing',
    logo: '/socioscopy.png',
  },
  {
    id: 'revelio',
    title: 'Revelio',
    description:
      'Vous croyez bien connaître vos proches ? Défiez-les et voyez si vous aviez raison !',
    color: '#3CBF77',
    enabled: false,
    path: '/revelio/landing',
    logo: '/revelio.png',
  },
]

export default function HubPage() {
  const [currentApp, setCurrentApp] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [offset, setOffset] = useState(apps.length) // Offset pour centrer sur le groupe du milieu
  const router = useRouter()

  const resetPositionSilently = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      // Désactiver la transition
      const carousel = document.querySelector('.carousel-container') as HTMLElement
      if (carousel) {
        carousel.style.transition = 'none'
      }

      // Réinitialiser à la position centrale
      setOffset(apps.length)

      // Réactiver la transition après un bref délai
      setTimeout(() => {
        if (carousel) {
          carousel.style.transition = 'transform 500ms ease-in-out'
        }
        setIsTransitioning(false)
      }, 50)
    }, 500)
  }

  const handlePrevious = () => {
    if (isTransitioning) return
    setIsTransitioning(true)

    if (currentApp <= 0) {
      setCurrentApp(apps.length - 1)
      setOffset(offset - 1)
      resetPositionSilently()
    } else {
      setCurrentApp(currentApp - 1)
      setOffset(offset - 1)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 500)
    }
  }

  const handleNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)

    if (currentApp >= apps.length - 1) {
      setCurrentApp(0)
      setOffset(offset + 1)
      resetPositionSilently()
    } else {
      setCurrentApp(currentApp + 1)
      setOffset(offset + 1)
      setTimeout(() => {
        setIsTransitioning(false)
      }, 500)
    }
  }

  const handleStart = () => {
    const app = apps[currentApp]
    if (app.enabled) {
      router.push(app.path)
    }
  }

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (isTransitioning) return
    setTouchEnd(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || isTransitioning) return

    const distance = touchStart - touchEnd
    const minSwipeDistance = 50

    if (Math.abs(distance) < minSwipeDistance) {
      setTouchStart(0)
      setTouchEnd(0)
      return
    }

    if (distance > 0) {
      handleNext()
    } else {
      handlePrevious()
    }

    setTouchStart(0)
    setTouchEnd(0)
  }

  const getTranslateX = () => {
    const baseTranslation = -((offset - apps.length) * 100)
    const touchOffset = touchEnd ? touchStart - touchEnd : 0
    return `calc(${baseTranslation}% - ${touchOffset}px)`
  }

  return (
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

                    <h2
                      className='text-2xl font-bold text-center mb-3'
                      style={{ color: app.color }}
                    >
                      {app.title}
                    </h2>
                    <p className='text-base text-gray-600 text-center'>{app.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Version desktop : carrousel */}
        <div className='hidden md:block w-full'>
          <div
            className='carousel-container max-w-4xl w-full transition-transform duration-500 ease-in-out transform'
            style={{
              transform: `translateX(${getTranslateX()})`,
              transition: touchEnd ? 'none' : 'transform 500ms ease-in-out',
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className='flex'>
              {[...apps, ...apps, ...apps].map((app, index) => (
                <div
                  key={`${app.id}-${index}`}
                  className={`w-full flex-shrink-0 px-4 md:px-8 transform transition-all duration-500 ${
                    index % apps.length === currentApp
                      ? 'scale-100 opacity-100'
                      : 'scale-95 opacity-50'
                  }`}
                >
                  <div className='bg-white rounded-2xl shadow-xl p-4 md:p-8 space-y-4 md:space-y-6'>
                    <h2
                      className='text-3xl md:text-4xl font-bold text-center'
                      style={{ color: app.color }}
                    >
                      {app.title}
                    </h2>
                    <p className='text-lg md:text-xl text-gray-600 text-center'>
                      {app.description}
                    </p>

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

                    <div className='flex justify-center'>
                      <Button
                        onClick={handleStart}
                        disabled={!app.enabled}
                        className='w-full md:w-auto px-6 md:px-8 py-3 text-lg font-semibold rounded-xl transform transition-all duration-200 hover:scale-105 disabled:hover:scale-100'
                        style={{
                          backgroundColor: app.enabled ? app.color : '#999999',
                          color: 'white',
                        }}
                      >
                        {app.enabled ? 'Commencer' : 'Bientôt disponible'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicateurs de navigation desktop */}
          <div className='hidden md:flex absolute top-1/2 left-4 z-10'>
            <button
              onClick={handlePrevious}
              className='transform -translate-y-1/2 p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400'
              aria-label='Application précédente'
            >
              <ChevronLeft className='h-6 w-6' />
            </button>
          </div>

          <div className='hidden md:flex absolute top-1/2 right-4 z-10'>
            <button
              onClick={handleNext}
              className='transform -translate-y-1/2 p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400'
              aria-label='Application suivante'
            >
              <ChevronRight className='h-6 w-6' />
            </button>
          </div>

          {/* Indicateurs de pagination desktop */}
          <div className='hidden md:flex absolute bottom-4 left-0 right-0 justify-center space-x-2'>
            {apps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentApp(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentApp ? 'bg-gray-800 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Aller à l'application ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
