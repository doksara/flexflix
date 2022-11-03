import Head from "next/head"
import { GetServerSideProps, NextPage } from "next"
import { getJson } from ".."
import { SeasonDetails, TvShowDetails } from '../../interface'
import { EpisodeOverview } from "../../modules/EpisodeOverview/EpisodeOverview"
import { Container, Text } from "@nextui-org/react"
import { useEffect } from "react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "../../lib/supabase/database.types"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!
  const API_KEY = process.env.TMDB_API_KEY
  const URL = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`
  const tvShow = await getJson<TvShowDetails>(URL)

  const seasonNumber = 0 // TODO - fix this
  const seasonUrl = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US&page=1`

  const season = await getJson<SeasonDetails>(seasonUrl)

  return {
    props: {
      show: tvShow,
      season: season
    }
  }
}

interface TvShowDetailsProps {
  show: TvShowDetails,
  season: SeasonDetails
}

const TvShowDetails: NextPage<TvShowDetailsProps> = ({ show, season }) => {
  const supabaseClient = useSupabaseClient<Database>()
  const user = useUser()

  useEffect(() => {
    if (user) {
      supabaseClient
        .from('user_tvshow')
        .select('watched_episodes')
        .eq('user', user.id)
        .then(episodes => console.log(episodes))
    }
  })

  return (
    <>
      <Head>
        <title>{show.name} :: flexflix</title>
      </Head>
      <Container md>
        <Text h1>{show.name}</Text>
        <Text>{show.overview}</Text>
        <EpisodeOverview season={season} />
      </Container>
    </>
  )
}

export default TvShowDetails