import { Container } from "styled-system/jsx"
import { MovieList } from "@/modules/MovieList"
import { redirect } from "next/navigation"
import { createServerClient } from "@/shared/lib"
import { Metadata } from "next"
import { tvRepository } from "@/entities/TvShow"

export const metadata: Metadata = {
  title: "Discover :: flexflix",
  description: "Discover the latest and greatest movies and TV shows",
}

export default async function Home() {
  const tvShows = await tvRepository.getTrending()
  const supabase = await createServerClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/login")
  }

  return (
    <main>
      <Container mt={8}>
        <MovieList movies={tvShows.results} />
      </Container>
    </main>
  )
}
