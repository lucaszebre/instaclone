import NextAuth from "next-auth"
import "next-auth/jwt"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from 'next-auth'
import LinkedIn from "next-auth/providers/linkedin"
import prisma from "./lib/db"
import { getUser } from "./actions/getUser"
import { random } from "nanoid"

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
        username:user.name + random(2).toString().slice(0,6),  // randowzine the username  because he should be unique 
        profilePictureUrl:user.image

      }})
    }
    
    // Allow sign in
    return true
  },
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
       if (pathname === "/auth" || pathname === "/"){
        return false   // if false mean we not auth should be redirected
       }

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
  debug: process.env.NODE_ENV == "production" ? true : false,
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

