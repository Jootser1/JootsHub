'use client'

import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import { ContactsDebugger } from '@/components/dev/ContactsDebugger'
import { PerformanceDebugger } from '@/components/dev/PerformanceDebugger'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      {children}
      
      {/* Composants de débogage en mode développement */}
      {process.env.NODE_ENV === 'development' && (
        <>
          <ContactsDebugger position="top-left" />
          <PerformanceDebugger position="bottom-right" />
        </>
      )}
    </SessionProvider>
  )
}
