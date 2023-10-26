import bcrypt from 'bcrypt'

export const comparePasswords = (password: string, hash: string) => {
  return bcrypt.compare(password, hash)
}

export const hashPassword = (password:string) => {
  return bcrypt.hash(password, 5)
}

import prisma from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { env } from 'process';
import { v4 as uuidv4 } from 'uuid';

const tokenName =
  env.NODE_ENV === 'development'
    ? 'next-auth.session-token'
    : '__Secure-next-auth.session-token';

export const authOptions: (
  req: NextApiRequest,
  res: NextApiResponse
) => AuthOptions = (req, res) => ({
  
  jwt: {
    secret: 'YOUR_SECRET_KEY', // Replace with your secret key
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'your email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials) {
            const user = await prisma.user.findUnique({
                where: { email: credentials.email },
            });
            if (user) {
                const isValid = await comparePasswords(credentials.password, user.password);
                if (isValid) {
                    return user;
                }
            }
        }
        return null; // Return null if authentication fails
    }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("Inside signIn callback");
      
      // Check if the signIn method is 'credentials'
      if (account && account.type !== 'credentials') {
        console.log("Not a credentials sign-in. Using default behavior.");
        return true;
      }
    
      // Ensure there's a user object
      if (!user) {
        console.log("No user object found. Access denied.");
        return false;
      }
    
      console.log("User object:", user);
    
      const uuid = uuidv4();
      const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    
      try {
        const existingSession = await prisma.session.findUnique({
          where: {
            userId: user.id,
          },
        });
    
        if (existingSession) {
          console.log("Updating existing session for user:", user.id);
          await prisma.session.update({
            where: {
              userId: user.id,
            },
            data: {
              expires: expireAt,
            },
          });
        } else {
          console.log("Creating new session for user:", user.id);
          await prisma.session.create({
            data: {
              userId: user.id,
              expires: expireAt,
              sessionToken: uuid,
            },
          });
        }
    
        // Set the cookie on the server side
        res.setHeader('Set-Cookie', `${tokenName}=${uuid}; Expires=${expireAt.toUTCString()}; Path=/; SameSite=Lax; ${env.NODE_ENV === 'production' ? 'Secure;' : ''}`);
        console.log("Cookie set successfully");
    
        return true;  // Let NextAuth handle the rest of the sign-in process
    
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;  // Deny access if there's an error
      }
    }
  },
});