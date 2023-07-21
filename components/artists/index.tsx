import { Container, Flex, Text } from "@chakra-ui/react"
import { Artist } from "../../types"
import { Suspense, useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  Image,
  ScrollControls,
  Scroll,
  useScroll,
  Line,
  Text as ThreeText,
  Center,
  GradientTexture,
} from "@react-three/drei"
import { proxy, useSnapshot } from "valtio"

const damp = THREE.MathUtils.damp

interface Props {
  artists: Artist[]
}

const Artists = ({ artists }: Props) => {
  const [colors, setColors] = useState<number[]>([])
  const [urls, setUrls] = useState<string[]>([])

  useEffect(() => {
    let aux: string[] = []
    artists.map((artist: Artist) => {
      if (artist.images !== undefined) {
        aux.push(artist.images[0].url)
      }
      setUrls(aux)
    })
  }, [artists])

  const state = proxy({
    clicked: null,
    urls: urls,
  })

  const Minimap = () => {
    const ref: any = useRef()
    const scroll = useScroll()
    const { urls } = useSnapshot(state)
    const { height } = useThree((state) => state.viewport)

    useFrame((state, delta) => {
      ref?.current?.children?.forEach((child: any, index: number) => {
        const y = scroll.curve(
          index / urls.length - 1.5 / urls.length,
          4 / urls.length
        )
        child.scale.y = damp(child.scale.y, 0.1 + y / 6, 8, delta)
      })
    })

    return (
      <group ref={ref}>
        {urls.map((_, i) => (
          <Line
            key={i}
            color="black"
            points={[
              new THREE.Vector3(0, -0.5, 0),
              new THREE.Vector3(0, 0.5, 0),
            ]}
            position={[i * 0.06 - urls.length * 0.03, -height / 2 + 0.6, 0]}
          />
        ))}
      </group>
    )
  }

  const Item = ({
    index,
    position,
    scale,
    c = new THREE.Color(),
    ...props
  }: any) => {
    const ref: any = useRef()
    const refWord: any = useRef()
    const refHtml: any = useRef()
    const scroll = useScroll()
    const { clicked, urls } = useSnapshot(state)
    const [hovered, hover] = useState(false)
    const click = () => (state.clicked = index === clicked ? null : index)
    const over = () => hover(true)
    const out = () => hover(false)

    const [hoveredWord, hoverWord] = useState(false)
    const overWord = (e: any) => (e.stopPropagation(), hoverWord(true))
    const outWord = () => hoverWord(false)
    const color = new THREE.Color()

    useFrame((state, delta) => {
      const y = scroll.curve(
        index / urls.length - 1.5 / urls.length,
        4 / urls.length
      )
      ref.current.material.scale[1] = ref.current.scale.y = damp(
        ref.current.scale.y,
        clicked === index ? 5 : 4 + y,
        8,
        delta
      )
      ref.current.material.scale[0] = ref.current.scale.x = damp(
        ref.current.scale.x,
        clicked === index ? 6.7 : scale[0],
        6,
        delta
      )
      if (clicked !== null && index < clicked) {
        ref.current.position.x = damp(
          ref.current.position.x,
          position[0] - 3,
          6,
          delta
        )
        refHtml.current.position.x = damp(
          ref.current.position.x,
          position[0] - 3,
          6,
          delta
        )
      }
      if (clicked !== null && index > clicked) {
        ref.current.position.x = damp(
          ref.current.position.x,
          position[0] + 3,
          6,
          delta
        )
        refHtml.current.position.x = damp(
          ref.current.position.x,
          position[0] + 3,
          6,
          delta
        )
      }
      if (clicked === null || clicked === index) {
        ref.current.position.x = damp(
          ref.current.position.x,
          position[0],
          6,
          delta
        )
        refHtml.current.position.x = damp(
          ref.current.position.x,
          position[0],
          6,
          delta
        )
      }

      ref.current.material.grayscale = damp(
        ref.current.material.grayscale,
        hovered || clicked === index ? 0 : Math.max(0, 1 - y),
        6,
        delta
      )
      ref.current.material.color.lerp(
        c.set(hovered || clicked === index ? "white" : "#aaa"),
        hovered ? 0.3 : 0.1
      )

      if (refWord.current !== undefined) {
        refWord.current?.quaternion?.copy(state.camera.quaternion)
        refWord.current?.material.color.lerp(
          color.set(
            hoveredWord
              ? `rgba(${colors[index]}, ${
                  colors[(index + 1) % artists.length]
                }, ${colors[(index + 2) % artists.length]}, 0.35)`
              : "white"
          ),
          0.1
        )
      }
    })

    useEffect(() => {
      if (hoveredWord) {
        document.body.style.cursor = "pointer"
      } else {
        document.body.style.cursor = "auto"
      }
    }, [hoveredWord])

    return (
      <>
        <Image
          ref={ref}
          {...props}
          position={position}
          scale={scale}
          onClick={click}
          onPointerOver={over}
          onPointerOut={out}
        />
        <group position={[position[0], 0, 20]} ref={refHtml} scale={scale}>
          {clicked === index && (
            <Center position={[0, -0.05, 0]} rotation={[0, 0, 0]}>
              <mesh rotation={[0, 0, Math.PI / 2]}>
                <planeGeometry args={[0.3, 4.8]} />
                <meshBasicMaterial transparent={true}>
                  <GradientTexture
                    stops={[0, 0.5, 1]}
                    colors={["rgba(0,0,0,0)", "black", "transparent"]}
                    size={1024}
                  />
                </meshBasicMaterial>
              </mesh>
              <ThreeText
                font="/Inter_Bold.json"
                lineHeight={1}
                letterSpacing={0.06}
                fontSize={0.22}
                onPointerOver={overWord}
                onPointerOut={outWord}
                ref={refWord}
              >
                {artists[index].name}
              </ThreeText>
            </Center>
          )}
        </group>
      </>
    )
  }

  const Items = ({ w = 1.4, gap = 0.15 }: any) => {
    const { urls } = useSnapshot(state)
    const { width } = useThree((state) => state.viewport)
    const xW = w + gap
    return (
      <ScrollControls
        horizontal
        damping={0.1}
        pages={(width - xW + urls.length * xW) / width}
      >
        <Minimap />
        <Scroll>
          {
            urls.map((url, i) => <Item key={i} index={i} position={[i * xW, 0, 0]} scale={[w, 4, 1]} url={url} />) /* prettier-ignore */
          }
        </Scroll>
      </ScrollControls>
    )
  }

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
    <Container maxW="7xl" my={24}>
      <Flex w="full" flexDir="column" justifyContent="center" h="700px">
        <Text fontSize="3xl" fontWeight="bold" m="auto" mb={0}>
          Tus artistas favoritos
        </Text>
        <Flex h="full" mt={-20}>
          {urls.length > 0 && (
            <Suspense fallback={null}>
              <Canvas
                gl={{ antialias: false }}
                dpr={[1, 1.5]}
                onPointerMissed={() => (state.clicked = null)}
                orthographic
                camera={{ position: [0, 0, 100], zoom: 100 }}
              >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 10]} />
                <Items />
              </Canvas>
            </Suspense>
          )}
        </Flex>
      </Flex>
    </Container>
  )
}

export default Artists
