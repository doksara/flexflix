import Head from "next/head"
import { SeasonDetails, TvShowDetails } from "@/core/api/interface"
import { getJson, promiseWhen } from "utils"
import { Container } from "styled-system/jsx"
import { EpisodeOverview } from "@/modules/EpisodeOverview/EpisodeOverview"
import { Text } from "components/Text"

const getData = async (id: number) => {
  const API_KEY = process.env.TMDB_API_KEY
  const URL = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`
  const tvShow = await getJson<TvShowDetails>(URL)

  const promises = tvShow.seasons.map((num, index) =>
    getJson<SeasonDetails>(
      `https://api.themoviedb.org/3/tv/${id}/season/${index}?api_key=${API_KEY}&language=en-US&page=1`
    )
  )

  const seasons = await promiseWhen<SeasonDetails>(promises).then((data) => {
    return data.filter((promise) => promise.response).map((i) => i.response)
  })

  return {
    show: tvShow,
    seasons: seasons as SeasonDetails[],
  }
}

const TvShowDetailsPage = async (props: {
  show: TvShowDetails
  seasons: SeasonDetails[]
  params: Promise<{ id: number }>
}) => {
  const params = await props.params

  const { show, seasons } = props

  const { id } = params
  const data = await getData(id)

  return (
    <>
      <Head>
        <title>Test :: flexflix</title>
      </Head>
      <Container maxW="3xl">
        <Text>{data.show.name}</Text>
        <Text>{data.show.overview}</Text>
        <EpisodeOverview seasons={data.seasons} showId={data.show.id} />
      </Container>
    </>
  )
}

export default TvShowDetailsPage
