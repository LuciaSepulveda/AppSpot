import { Box, Container, Flex, Text, useColorModeValue } from "@chakra-ui/react"
import { Track } from "../../types"
import Image from "next/image"
import { useState } from "react"
import { StarIcon } from "@chakra-ui/icons"
import { Tilt } from "react-tilt"

interface Props {
  tracks: Track[]
}

const defaultOptions = {
  reverse: false, // reverse the tilt direction
  max: 35, // max tilt rotation (degrees)
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1.5, // 2 = 200%, 1.5 = 150%, etc..
  speed: 1000, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be disabled. Can be X or Y.
  reset: true, // If the tilt effect has to be reset on exit.
  easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
}

const Tracks = ({ tracks }: Props) => {
  const [hoverSelection, setHoverSelection] = useState<number | undefined>()
  const bg = useColorModeValue(
    "rgba(206, 206, 206, 0.9)",
    "rgba(0, 0, 0, 0.9)"
  )
  const bgHover = useColorModeValue(
    "rgba(206, 206, 206, 0.3)",
    "rgba(0, 0, 0,0.3)"
  )

  return (
    <Container
      maxW="7xl"
      py={8}
      my={4}
      minH="100vh"
      display="flex"
      alignContent="center"
    >
      <Flex w="full" flexDir="column" justifyContent="center">
        <Text fontSize="3xl" fontWeight="bold" mx="auto" mb={8}>
          Tus canciones favoritas
        </Text>
        <Flex w="full" gap={4} flexWrap="wrap" justify="center">
          {tracks.map((track, index) => (
            <Tilt
              options={defaultOptions}
              key={track.id}
              style={{
                display: "flex",
                flexDirection: "column",
                minWidth: "10rem",
                maxWidth: "02rem",
                background: hoverSelection === index ? bg : bgHover,
                zIndex: hoverSelection === index ? "10" : "0",
                transformStyle: "preserve-3d",
                borderRadius: "4px",
                padding: "1rem",
                height: "15rem",
                justifyContent: "flex-start",
              }}
              onMouseEnter={() => setHoverSelection(index)}
              onMouseLeave={() => setHoverSelection(undefined)}
            >
              <Box w={32} minH={32} h={32} transform="translateZ(20px)">
                <Image
                  fill={true}
                  src={track.album.images[1].url}
                  alt="album"
                />
              </Box>
              <Text
                py={1}
                fontWeight="semibold"
                textAlign="left"
                transform="translateZ(20px)"
              >
                {track.artists[0].name}
              </Text>
              <Box
                position="relative"
                overflow="hidden"
                whiteSpace="nowrap"
                transform="translateZ(20px)"
              >
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
              <Flex transform="translateZ(20px)" align="center" gap={1}>
                <StarIcon boxSize={3} />
                <Text>{track.popularity / 10}</Text>
              </Flex>
            </Tilt>
          ))}
        </Flex>
      </Flex>
    </Container>
  )
}

export default Tracks
