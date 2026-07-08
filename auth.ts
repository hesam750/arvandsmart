import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        username: { label: 'Username' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        const username = credentials?.username as string | undefined
        const password = credentials?.password as string | undefined

        // Read expected credentials from env vars (server-only)
        const adminUser = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin'
        const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'Arvand@1403'

        if (username === adminUser && password === adminPass) {
          return { id: '1', name: username, email: 'admin@arvandsmart.com' }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name as string
      }
      return session
    },
  },
})
