import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import useSpotify from "../../hooks/useSpotify"
import Artists from "../../components/artists"
import Header from "../../components/header"
import { Flex, Spinner } from "@chakra-ui/react"

export default function Home() {
  const { data: session, status } = useSession()
  const [artists, setArtists] = useState([])
  const [loading, setLoading] = useState(true)
  const spotifyApi = useSpotify()

  useEffect(() => {
    if (spotifyApi.getAccessToken() && loading) {
      // spotifyApi.getUserPlaylists().then((data: any) => {
      //   setPlaylists(data.body.items)
      // })
      setLoading(false)
      spotifyApi.getMyTopArtists().then((data: any) => {
        setArtists(data.body.items)
      })
    }
  }, [session, spotifyApi])

  return (
    <>
      <main style={{ width: "100%" }}>
        <Header user={session?.user} />
        {loading && (
          <Flex align="center" h="400" justify="center" w="full">
            <Spinner />
          </Flex>
        )}
        {!loading && <Artists artists={artists} />}
      </main>
    </>
  )
}
