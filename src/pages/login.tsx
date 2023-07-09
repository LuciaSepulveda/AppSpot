import { Box, Button, Flex, Text } from "@chakra-ui/react"
import { getProviders, signIn } from "next-auth/react"
import Image from "next/image"

const Login = ({ providers }: any) => {
  return (
    <Flex flexDir="column" justify="center" align="center" h="100vh">
      <Box w={32} mb={6}>
        <img src="/logo.png" alt="Logo spotify" />
      </Box>
      <>
        {Object.values(providers).map((provider: any) => (
          <div key={provider.name}>
            <Button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
              Iniciar sesión con {provider.name}
            </Button>
          </div>
        ))}
      </>
    </Flex>
  )
}

export default Login

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}
