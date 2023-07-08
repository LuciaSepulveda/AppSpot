import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../../lib/spotify"

const refreshAccessToken = async (token: any) => {
  try {
    spotifyApi.setAccessToken(token.access_token)
    spotifyApi.setRefreshToken(token.refresh_token)

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken()

    return {
      ...token,
      accessToek: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken
    }
  } catch (error) {
    console.log(error)

    return { ...token, error: "refresh access token error" }
  }
}

export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_CLIENT_ID || "",
      clientSecret: process.env.NEXT_SECRET_CLIENT || "",
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }: any) {
      //initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        }
      }

      if (Date.now() < token.accessTokenExpires) {
        return token
      }

      return await refreshAccessToken(token)
    },

    async session({session, token}: any) {
        session.user.accessToken = token.accessToken
        session.user.refreshToken = token.refreshToken
        session.user.username = token.username

        return session
    }
  },
}
export default NextAuth(authOptions)
