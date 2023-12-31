import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    error?: any & DefaultSession
    user: {
      accessToken?: any
    } & DefaultSession["user"]
  }
}
