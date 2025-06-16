'use client'

import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'
import { ContactsDebugger } from '@/components/dev/ContactsDebugger'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      {children}
      
      {/* Composants de débogage en mode développement */}
      {process.env.NODE_ENV === 'development' && (
        <>
          <ContactsDebugger position="top-left" />
        </>
      )}
    </SessionProvider>
  )
}
