import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { JWT } from 'next-auth/jwt'
import { User as NextAuthUser } from 'next-auth'

interface User extends NextAuthUser {
  id: string
  token?: string
}

interface CustomSession extends Session {
  user: {
    id: string
  } & Session['user']
  accessToken: string
}

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log(process.env.NEXT_PUBLIC_API_URL);
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (res.data && res.data.access_token) {
            return { 
              id: res.data.user.id, 
              username: res.data.user.username, 
              email: res.data.user.email, 
              token: res.data.access_token 
            };
          }
          return null;
        } catch (error) {
          console.error("Erreur d'authentification :", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT, user?: User }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }: { session: CustomSession, token: JWT }) {
      session.user.id = token.id as string;
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
