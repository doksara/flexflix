import Head from "next/head"
import {
  MissingResource,
  SeasonDetails,
  TvShowDetails,
} from "@/core/api/interface"
import { getJson, promiseWhen } from "utils"
import { Container } from "styled-system/jsx"
import { EpisodeOverview } from "@/modules/EpisodeOverview/EpisodeOverview"
import { Text } from "@/shared/ui"

const getData = async (id: number) => {
  const URL = `/tv/${id}&language=en-US`
  const tvShow = await getJson<TvShowDetails>(URL)

  const promises = tvShow.seasons.map((num, index) =>
    getJson<SeasonDetails>(`/tv/${id}/season/${index}&language=en-US&page=1`)
  )

  const seasons = (await promiseWhen<SeasonDetails | MissingResource>(
    promises
  ).then((data) => {
    return data.filter((promise) => promise.response).map((i) => i.response)
  })) as (SeasonDetails | MissingResource)[]

  const properSeasons = seasons.filter((s) => !("success" in s))

  return {
    show: tvShow,
    seasons: properSeasons as SeasonDetails[],
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
