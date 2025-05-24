import { createServerClient } from "@/shared/lib"
import { MovieList } from "@/widgets/MovieList"
import { Container } from "styled-system/jsx"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Library :: flexflix",
  description: "Your library of watched TV shows and movies",
}

const MyLibraryPage = async () => {
  const supabase = await createServerClient()

  return (
    <Container maxW="[768px]" pt="20">
      {/*   <MovieList movies={tvShows.results} /> */}
    </Container>
  )
}

export default MyLibraryPage
