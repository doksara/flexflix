import Head from "next/head"
import { GetServerSideProps, NextPage } from "next"
import { SeasonDetails, TvShowDetails } from '../../interface'
import { EpisodeOverview } from "../../modules/EpisodeOverview/EpisodeOverview"
import { Container, Text } from "@nextui-org/react"
import { getJson, promiseWhen } from "../../utils"


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!
  const API_KEY = process.env.TMDB_API_KEY
  const URL = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`
  const tvShow = await getJson<TvShowDetails>(URL)

  const promises = tvShow.seasons.map((num, index) => getJson<SeasonDetails>(`https://api.themoviedb.org/3/tv/${id}/season/${index}?api_key=${API_KEY}&language=en-US&page=1`))

  const seasons = await promiseWhen<SeasonDetails>(promises).then(o => {
    const f = o.filter(o => o.response)

    return f.map(i => i.response)
  })
console.log(seasons)
  return {
    props: {
      show: tvShow,
      seasons: seasons
    }
  }
}

interface TvShowDetailsProps {
  show: TvShowDetails,
  seasons: SeasonDetails[]
}

const TvShowDetails: NextPage<TvShowDetailsProps> = ({ show, seasons }) => {
  console.log(seasons)
  return (
    <>
      <Head>
        <title>{show.name} :: flexflix</title>
      </Head>
      <Container md>
        <Text h1>{show.name}</Text>
        <Text>{show.overview}</Text>
        <EpisodeOverview seasons={seasons} />
      </Container>
    </>
  )
}

export default TvShowDetails