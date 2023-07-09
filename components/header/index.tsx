import { Box, Button, Container, Flex, Text } from "@chakra-ui/react"
import type { Session } from "next-auth"
import Image from "next/image"
import { signOut } from "next-auth/react"

const Header = ({ user }: Session["user"]) => {
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
              <Image
                src={user?.image}
                fill={true}
                alt={"Image of user"}
              />
            </Box>
          </Flex>
          <Button onClick={() => signOut()}>Cerrar sesión</Button>
        </Flex>
      </Container>
    </header>
  )
}

export default Header
