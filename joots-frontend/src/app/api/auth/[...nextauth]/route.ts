import NextAuth, { Session } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios, { AxiosError } from 'axios'
import { JWT } from 'next-auth/jwt'
import { User as NextAuthUser } from 'next-auth'
import { logger } from '@/utils/logger'

interface User extends NextAuthUser {
  id: string
  token?: string
}

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'example@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          logger.warn("Tentative d'authentification sans credentials")
          throw new Error('Email et mot de passe requis')
        }

        const apiUrl = process.env.API_INTERNAL_URL
        if (!apiUrl) {
          logger.error('API_INTERNAL_URL non défini')
          throw new Error('Configuration serveur invalide')
        }

        try {
          logger.info('Tentative de connexion à', { apiUrl })
          const res = await axios.post(`${apiUrl}/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          })

          if (!res.data) {
            logger.error('Réponse vide du serveur')
            throw new Error('Réponse serveur invalide')
          }

          if (res.data?.user?.user_id && res.data?.access_token) {
            logger.info('Authentification réussie', { 
              userId: res.data.user.user_id,
              email: res.data.user.email 
            })
            return {
              id: res.data.user.user_id,
              email: res.data.user.email,
              token: res.data.access_token,
            }
          }

          logger.error('Réponse invalide du serveur au login', { 
            response: res.data,
            status: res.status 
          })
          throw new Error('Réponse invalide du serveur')
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            logger.error("Erreur d'authentification", {
              message: error.message,
              response: error.response?.data,
              status: error.response?.status,
              url: error.config?.url,
            })
            
            if (error.response?.status === 401) {
              throw new Error('Email ou mot de passe incorrect')
            }
            
            throw new Error(error.response?.data?.message || "Erreur d'authentification")
          }
          logger.error("Erreur inconnue", { error })
          throw new Error("Erreur d'authentification inconnue")
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id
        token.accessToken = user.token
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      return {
        user: {
          id: token.id as string,
          email: session.user?.email,
        },
        accessToken: token.accessToken as string,
        expires: session.expires,
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
