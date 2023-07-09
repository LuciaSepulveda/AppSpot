import { Box, Container, Flex, Text } from "@chakra-ui/react"
import { Track } from "../../types"
import Image from "next/image"
import { useState } from "react"
import { StarIcon } from "@chakra-ui/icons"

interface Props {
  tracks: Track[]
}

const Tracks = ({ tracks }: Props) => {
  //const [hoverSelection, setHoverSelection] = useState<number | undefined>()

  return (
    <Container maxW="7xl" overflow="scroll" py={8} my={4}>
      <Flex w="full" flexDir="column" justifyContent="center">
        <Text fontSize="3xl" fontWeight="bold" m="auto" mb={8}>
          Tus canciones favoritas
        </Text>
        <Flex w="full" gap={4} flexWrap="wrap" justify="center">
          {tracks.map((track, index) => (
            <Flex
              justify="flex-start"
              flexDir="column"
              minWidth={160}
              maxW={160}
              key={track.id}
              background="blackAlpha.300"
              borderRadius="sm"
              p={4}
              h={60}
              //   onMouseEnter={() => setHoverSelection(index)}
              //   onMouseLeave={() => setHoverSelection(undefined)}
            >
              <Box bg="red" w={32} minH={32} h={32} position="relative">
                <Image
                  fill={true}
                  src={track.album.images[0].url}
                  alt="album"
                />
              </Box>
              <Text py={1} fontWeight="semibold" textAlign="left">
                {track.artists[0].name}
              </Text>
              <Box position="relative" overflow="hidden" whiteSpace="nowrap">
                <Text
                  textAlign="left"
                  overflow="hidden"
                  fontSize="sm"
                  wordBreak="break-word"
                  textOverflow="ellipsis"
                >
                  {track.name}
                </Text>
              </Box>
              <Flex align="center" gap={1}>
                <StarIcon boxSize={3} />
                <Text>{track.popularity / 10}</Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Container>
  )
}

export default Tracks
