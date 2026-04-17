import { PrismaAdapter } from '@auth/prisma-adapter'
import { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

import { prisma } from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
        })

        if (!user?.password || !user.isActive) return null

        const valid = await bcrypt.compare(credentials.password, user.password)
        if (!valid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        } as any
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const mutableToken = token as any
      if (user) {
        mutableToken.id = (user as any).id
        mutableToken.role = (user as any).role
      }
      return mutableToken
    },
    async session({ session, token }) {
      const mutableToken = token as any
      if (session.user) {
        ;(session.user as any).id = mutableToken.id
        ;(session.user as any).role = mutableToken.role
      }
      return session
    },
  },
}
