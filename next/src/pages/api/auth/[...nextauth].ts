import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getCsrfToken } from "next-auth/react"
import { SiweMessage } from "siwe"
import { createUser, getUserByWalletId } from "../../../lib/queries"
import connection from "../../../lib/db"

export default async function auth(req: any, res: any) {
  let isNewUser = false

  const providers = [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0"
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0"
        }
      },
      async authorize(credentials) {
        try {
          const siwe = new SiweMessage(JSON.parse(credentials?.message || "{}"))
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL!)

          const result = await siwe.verify({
            signature: credentials?.signature || "",
            domain: nextAuthUrl.host,
            nonce: await getCsrfToken({ req })
          })

          if (result.success) {
            return {
              id: siwe.address
            }
          }
          return null
        } catch (e) {
          return null
        }
      }
    })
  ]

  const isDefaultSigninPage =
    req.method === "GET" && req.query.nextauth.includes("signin")

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    providers.pop()
  }

  return await NextAuth(req, res, {
    providers,
    session: {
      strategy: "jwt"
    },
    pages: {
      signIn: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async signIn({ account }) {
        if (account?.provider === "credentials") {
          const user = await connection.query(getUserByWalletId, [account.providerAccountId]).then(res => res.rows[0])
          if (user.length === 0) {
            console.log("User with corresponding wallet not found")
            console.log("Creating new user")
            let newUser = await connection.query(createUser, [account.providerAccountId]).then(res => res.rows[0])
            if (newUser.length === 0) {
              console.log("Error creating new user")
              return false
            } else {
              console.log("New user with ID: " + newUser.id + " created")
              isNewUser = true
            }
          }
        }
        console.log("Sign in successful: " + account?.providerAccountId)
        return true
      },
      async session({ session, token }: { session: any; token: any }) {
        session.address = token.sub
        const user = await connection.query(getUserByWalletId, [token.sub]).then(res => res.rows[0])
        session.user.id = user.id
        session.user.walletId = user.walletId
        session.user.imageUrl = user.imageUrl || "https://source.boringavatars.com/bauhaus/260/" + user.walletId
        session.user.isAdmin = user.role === "Admin"
        session.user.name = user.name || user.walletId
        session.user.email = user.email || "you@example.com"
        session.user.about = user.about || "I am new and want to contribute!"
        if (isNewUser) {
          session.user.isNew = true
        }
        isNewUser = false
        return session
      }
    }
  })
}