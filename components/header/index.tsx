import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import type { Session } from "next-auth"
import Image from "next/image"
import { signOut } from "next-auth/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"

const Header = ({ user }: Session["user"]) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const color = useColorModeValue("rgb(27, 33, 46)", "rgb(206, 206, 206)")

  return (
    <header>
      <Container maxW="7xl">
        <Flex w="full" justifyContent="space-between" py={4}>
          <Flex align="center" gap={4}>
            <Text fontWeight="semibold">{user?.name}</Text>
            <Box
              bg="blue"
              position="relative"
              overflow="hidden"
              h="40px"
              w="40px"
              borderRadius="full"
            >
              <Image src={user?.image} fill={true} alt={"Image of user"} />
            </Box>
          </Flex>
          <Flex>
            <Center
              as="button"
              onClick={toggleColorMode}
              aria-hidden="true"
              mr={4}
            >
              {colorMode === "light" && <MoonIcon _hover={{ color: color }} />}
              {colorMode !== "light" && <SunIcon _hover={{ color: color }} />}
            </Center>
            <Button onClick={() => signOut()}>Cerrar sesión</Button>
          </Flex>
        </Flex>
      </Container>
    </header>
  )
}

export default Header
