import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string,
      walletId: string,
      name?: string,
      imageUrl?: string,
      isAdmin?: boolean,
      email?: string,
      about?: string,
      isNew?: boolean,
    }
  }
}