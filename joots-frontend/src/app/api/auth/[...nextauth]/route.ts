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
        console.log('🔐 NEXTAUTH AUTHORIZE CALLED', { credentials: !!credentials })
        logger.info('🔐 NextAuth authorize function called', { 
          hasCredentials: !!credentials,
          hasEmail: !!credentials?.email,
          hasPassword: !!credentials?.password
        })
        
        if (!credentials?.email || !credentials?.password) {
          logger.warn("Tentative d'authentification sans credentials")
          throw new Error('Email et mot de passe requis')
        }


        try {
          // Utiliser directement le backend en interne (container-to-container)
          const backendUrl = process.env.API_INTERNAL_URL + '/api/auth/login'

          const res = await axios.post(backendUrl, {
            email: credentials.email,
            password: credentials.password,
          }, {
            httpsAgent: new (require('https').Agent)({
              rejectUnauthorized: false // Ignorer les erreurs SSL en dev
            })
          })

          if (!res.data) {
            logger.error('Réponse vide du serveur')
            throw new Error('Réponse serveur invalide')
          }

          logger.info('Réponse complète du serveur', { 
            data: res.data,
            status: res.status,
            hasUser: !!res.data?.user,
            hasUserId: !!res.data?.user?.user_id,
            hasAccessToken: !!res.data?.access_token
          })

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
            status: res.status,
            userIdExists: !!res.data?.user?.user_id,
            accessTokenExists: !!res.data?.access_token
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
