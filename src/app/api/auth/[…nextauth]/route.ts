import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/db';
import { SchemaLogin } from '@/types';



export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'text', placeholder: 'test@test.com' },
        password: { type: 'password', placeholder: 'Pa$$w0rd' },
      },
      async authorize(credentials, req) {
        const { email, password } = SchemaLogin.parse(credentials);
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.username = token.username
      }

      return session
    },
    async jwt({ token, user }) {
      let email;
    if(token.email){
      email=token.email
    }
      const dbUser = await prisma.user.findFirst({
        where: {
          email: email,
        },
      })

      if (!dbUser) {
        token.id = user!.id
        return token
      }

      if (!dbUser.username) {
        await prisma.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            username: 'newuser',
          },
        })
      }

      return {
        id: dbUser.id,
        username: dbUser.username,
        email: dbUser.email,
      }
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
