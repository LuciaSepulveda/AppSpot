import { signOut, useSession } from "next-auth/react"

export default function Home() {
  const { data: session, status } = useSession()
  console.log(session)

  return (
    <>
      <main>
        <button onClick={() => signOut()}>Log out</button>
      </main>
    </>
  )
}
