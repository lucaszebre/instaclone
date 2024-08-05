import NextAuth from "next-auth"
import "next-auth/jwt"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from 'next-auth'
import LinkedIn from "next-auth/providers/linkedin"
import prisma from "./lib/db"
import { getUser } from "./actions/getUser"

const config = {
  theme: { logo: "https://authjs.dev/img/logo-sm.png" },
  providers: [
 
   
    GitHub,
    Google,
    LinkedIn
  
 
  ],
  basePath: "/auth"
  ,
  pages: {
    signIn: '/auth',
  }
  ,
  callbacks: {async signIn({ user, account, profile }) {
    // Check if the user exists in your database
    if(!user.email){
      return false
    }
    const existingUser = await getUser(user.email)
    
    if (!existingUser) {
      // If the user doesn't exist, create a new user in your database
      await prisma.user.create({data:{
        email:user.email,
        username:user.name||"random",
        profilePictureUrl:user.image

      }})
    }
    
    // Allow sign in
    return true
  },
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/auth" || pathname === "/") return true

      return !!auth?.user
    },
    jwt({ token, trigger, session, account }) {
      if (trigger === "update") token.name = session.user.name
      if (account?.provider === "keycloak") {
        return { ...token, accessToken: account.access_token }
      }
      return token
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken
      }
      return session
    },
  },
  experimental: {
    enableWebAuthn: true,
  },
  debug: process.env.NODE_ENV !== "production" ? true : false,
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)

declare module "next-auth" {
  interface Session {
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
  }
}

