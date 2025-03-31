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
        console.log("Tentative d'authentification avec:", { email: credentials?.email });
        console.log("URL de l'API:", process.env.NEXT_PUBLIC_API_URL);

        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email et mot de passe requis');
        }

        try {
          console.log("Envoi de la requête au backend...");
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          });
          console.log("Réponse du backend:", res.data);

          if (res.data && res.data.user && res.data.access_token) {
            console.log("Authentification réussie");
            return { 
              id: res.data.user.id, 
              username: res.data.user.username, 
              email: res.data.user.email, 
              token: res.data.access_token 
            };
          }
          throw new Error('Réponse invalide du serveur');
        } catch (error: any) {
          console.error("Erreur détaillée:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            headers: error.response?.headers
          });
          throw new Error(error.response?.data?.message || 'Erreur d\'authentification');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT, user?: User }) {
      console.log("Callback JWT:", { token, user });
      if (user) {
        token.id = user.id;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }: { session: CustomSession, token: JWT }) {
      console.log("Callback Session:", { session, token });
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
