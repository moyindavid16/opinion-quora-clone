import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./client";
import { Adapter } from "next-auth/adapters";


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  
  callbacks: {
    async session({token, session}) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({token, user}) {
        const client = await prisma.user.findFirst({
          where: {email: token.email}
        })

        if(!client){
          token.id=user.id
          return token
        }
        return {
          id: client.id,
          name: client.name,
          email: client.email,
          picture: client.image,
        }
    },
    async redirect(){
      return "/"
    }
  }
} 
