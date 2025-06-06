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

        try {
          const res = await axios.post(`${process.env.API_INTERNAL_URL}/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          })

          if (res.data?.user?.id && res.data?.access_token) {
            logger.info('Authentification réussie', { userId: res.data.user.id })
            return {
              id: res.data.user.id,
              email: res.data.user.email,
              token: res.data.access_token,
            }
          }
          logger.error('Réponse invalide du serveur au login', { response: res.data })
          throw new Error('Réponse invalide du serveur')
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            logger.error("Erreur d'authentification", {
              message: error.message,
              response: error.response?.data,
              status: error.response?.status,
            })
            throw new Error(error.response?.data?.message || "Erreur d'authentification")
          }
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
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
