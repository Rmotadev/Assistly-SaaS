import { PrismaAdapter } from '@auth/prisma-adapter'
import { NextAuthOptions, getServerSession } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { db } from '@/lib/db'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM ?? 'noreply@assistly.com.br',
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        const dbUser = await db.user.findUnique({
          where: { id: user.id },
          select: { id: true, tenantId: true, role: true },
        })
        session.user.id = user.id
        session.user.tenantId = dbUser?.tenantId ?? null
        session.user.role = dbUser?.role ?? 'MEMBER'
      }
      return session
    },
  },
  pages: { signIn: '/login', error: '/login' },
  session: { strategy: 'database' },
}

export const getSession = () => getServerSession(authOptions)
