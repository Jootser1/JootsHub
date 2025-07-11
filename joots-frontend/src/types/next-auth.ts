// Déclarations de types globales pour NextAuth
declare module 'next-auth' {
  interface User {
    id: string
  }
  
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
    accessToken?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
  }
}

// Export pour s'assurer que le fichier est traité comme un module
export {} 