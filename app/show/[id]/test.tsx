'use client'

import { Container, Text } from "@nextui-org/react"
import { SeasonDetails, TvShowDetails } from "../../../interface"
import { EpisodeOverview } from "../../../modules/EpisodeOverview/EpisodeOverview"

type TvShowDetailsProps = {
  show: TvShowDetails,
  seasons: SeasonDetails[]
}
export const Test = ({ show, seasons }: TvShowDetailsProps) => {
  return (
    <Container md>
      <Text h1>{show.name}</Text>
      <Text>{show.overview}</Text>
      <EpisodeOverview seasons={seasons} />
    </Container>
  )
}