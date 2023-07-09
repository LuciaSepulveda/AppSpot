import { Box, Container, Flex, Text } from "@chakra-ui/react"
import { Artist } from "../../types"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import {
  EffectCoverflow,
  Pagination,
  Mousewheel,
  Autoplay,
} from "swiper/modules"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { useEffect, useState } from "react"

interface Props {
  artists: Artist[]
}

const Artists = ({ artists }: Props) => {
  const [colors, setColors] = useState<number[]>([])

  useEffect(() => {
    if (colors.length === 0) {
      let array: number[] = []
      artists.forEach((elem, index) => {
        array[index] = Math.trunc(Math.random() * 255)
      })
      setColors(array)
    }
  }, [artists, colors.length])

  return (
    <Container maxW="7xl" overflow="scroll" mt={8}>
      <Flex w="full" flexDir="column" justifyContent="center">
        <Text fontSize="3xl" fontWeight="bold" m="auto" mb={8}>
          Tus artistas favoritos
        </Text>
        <Flex flexDir="row" w="full">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            mousewheel={true}
            direction="horizontal"
            pagination={{ el: ".swiper-pagination", clickable: true }}
            modules={[EffectCoverflow, Pagination, Mousewheel, Autoplay]}
            className="swiper_container"
            initialSlide={0}
            loopedSlides={3}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
          >
            {colors.length !== 0 &&
              artists.map((artist, index) => {
                return (
                  <SwiperSlide key={artist.name}>
                    <Flex
                      flexDir="column"
                      position="relative"
                      minW="200px"
                      w="400px"
                      h="300px"
                      bg={`rgba(${colors[index]}, ${
                        colors[(index + 1) % artists.length]
                      }, ${colors[(index + 2) % artists.length]}, 0.35)`}
                      borderRadius="lg"
                      backdropFilter="blur(4.5px)"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      justify="center"
                      align="center"
                    >
                      <Text fontSize="md" mb={4} fontWeight="bold">
                        {artist.name}
                      </Text>
                      <Box w="180px" h="180px" position="relative">
                        <Image
                          src={artist.images ? artist.images[1].url : ""}
                          alt={artist.name}
                          fill={true}
                          sizes="cover"
                          loading="lazy"
                        />
                        <div className="swiper-lazy-preloader"></div>
                      </Box>
                    </Flex>
                  </SwiperSlide>
                )
              })}
            <div className="swiper-pagination"></div>
          </Swiper>
        </Flex>
      </Flex>
    </Container>
  )
}

export default Artists
