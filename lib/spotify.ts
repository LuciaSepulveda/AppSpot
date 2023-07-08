import SpotifyWebApi from "spotify-web-api-node"

const scopes = [
  "user-read-email",
  "playlist-read-private",
  "streaming",
  "user-top-read",
  "user-read-playback-state",
].join(",")

const params = {
  scope: scopes,
}

const queryParamsString = new URLSearchParams(params)

export const LOGIN_URL =
  "https://accounts.spotify.com/authorize?" + queryParamsString.toString()

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_CLIENT_ID,
  clientSecret: process.env.NEXT_SECRET_CLIENT,
})

export default spotifyApi

const getAccessToken = async () => {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN || ""

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  })

  return response.json()
}

export const topTracks = async () => {
  const { access_token } = await getAccessToken()

  return fetch("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
}
