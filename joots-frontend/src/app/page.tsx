'use client'

import { redirect } from 'next/navigation'

export default function HomePage() {
  redirect('/login') // Redirection immédiate vers la page de connexion
  return null // Rien n'est affiché car la redirection est instantanée
}
