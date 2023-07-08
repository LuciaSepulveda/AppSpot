import { getProviders, signIn } from "next-auth/react"

const Login = ({ providers }: any) => {
  return (
    <div>
      LOGIN
      <>
        {Object.values(providers).map((provider: any) => (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
              {provider.name}
            </button>
          </div>
        ))}
      </>
    </div>
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
