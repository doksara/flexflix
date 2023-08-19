import Head from "next/head"
import { Container } from "../styled-system/jsx"
import { MovieList } from "modules/MovieList"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "lib/supabase/database.types"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface HomeProps {}

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <div>
      <Head>
        <title>Trending :: flexflix</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container mt={8}>
          <MovieList />
        </Container>
      </main>
    </div>
  )
}
