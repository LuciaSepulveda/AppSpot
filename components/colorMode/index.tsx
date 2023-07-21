import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { Center, useColorMode, useColorModeValue } from "@chakra-ui/react"

const ColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const color = useColorModeValue("rgb(27, 33, 46)", "rgb(206, 206, 206)")
  return (
    <Center as="button" onClick={toggleColorMode} aria-hidden="true" mr={4}>
      {colorMode === "light" && <MoonIcon _hover={{ color: color }} />}
      {colorMode !== "light" && <SunIcon _hover={{ color: color }} />}
    </Center>
  )
}

export default ColorMode
