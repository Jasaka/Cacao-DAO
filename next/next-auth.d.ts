import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      walletId: string,
      name?: string,
      imageUrl?: string,
      isAdmin?: boolean,
      email?: string,
      about?: string,
    }
  }
}