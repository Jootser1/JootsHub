"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function SplashScreen() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Check if the app is running in standalone mode (installed on home screen)
    const isInStandaloneMode = () =>
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes("android-app://")

    if (isInStandaloneMode()) {
      setShow(true)

      // Hide splash screen after 2 seconds
      const timer = setTimeout(() => {
        setShow(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <div className="w-32 h-32 relative mb-4">
          <Image
            src="/images/questions-logo.png"
            alt="Joots Logo"
            width={128}
            height={128}
            className="object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold text-purple-700">Joots</h1>
        <p className="text-gray-500 mt-2">Questions & Polls</p>
      </div>
    </div>
  )
}
