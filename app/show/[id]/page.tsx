import Head from "next/head"
import { NextPage } from "next"
import { SeasonDetails, TvShowDetails } from '../../../interface'
import { EpisodeOverview } from "../../../modules/EpisodeOverview/EpisodeOverview"
import { Container, Text } from "@nextui-org/react"
import { getJson, promiseWhen } from "../../../utils"
import { Test } from "./test"


export const getData = async (id: number) => {
  const API_KEY = process.env.TMDB_API_KEY
  const URL = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`
  const tvShow = await getJson<TvShowDetails>(URL)

  const promises = tvShow.seasons.map((num, index) => getJson<SeasonDetails>(`https://api.themoviedb.org/3/tv/${id}/season/${index}?api_key=${API_KEY}&language=en-US&page=1`))

  const seasons = await promiseWhen<SeasonDetails>(promises).then(data => {
    return data
      .filter(promise => promise.response)
      .map(i => i.response)
  })

  return {
    show: tvShow,
    seasons: seasons as SeasonDetails[]
  }
}

type TvShowDetailsProps = {
  show: TvShowDetails,
  seasons: SeasonDetails[]
}

// @ts-ignore
const TvShowDetails: NextPage<TvShowDetailsProps> = async ({ show, seasons, params }) => {
  const { id } = params
  const data = await getData(id)

  return (
    <>
      <Head>
        <title>Test :: flexflix</title>
      </Head>
      <Test seasons={data.seasons} show={data.show} />
    </>
  )
}

export default TvShowDetails