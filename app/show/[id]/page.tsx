import Image from "next/image"
import { SeasonDetails, TvShowDetails } from "@/shared/lib/tmdb/interface"
import { Container, Flex } from "styled-system/jsx"
import { EpisodeOverview } from "@/widgets/EpisodeOverview/EpisodeOverview"
import { Badge, Heading, Text } from "@/shared/ui"
import { getJson } from "@/shared/lib/http"
import { createServerClient } from "@/shared/lib"
import { tvRoutes } from "@/entities/TvShow"
import { cache } from "react"

const getTvWithSeasons = cache(async (id: number) => {
  const tvShow = await getJson<TvShowDetails>(tvRoutes.details(id))

  const seasonEndpoints = tvShow.seasons
    .map((_, index) => `season/${index + 1}`)
    .join(",")

  const tvShowWithSeasons = await getJson<TvShowDetails>(
    tvRoutes.detailsWithSeasons(id, seasonEndpoints)
  )

  const seasons = seasonEndpoints.split(",").map((endpoint) => {
    return tvShowWithSeasons[endpoint as keyof typeof tvShowWithSeasons]
  })

  return {
    show: tvShow,
    seasons: seasons as unknown as SeasonDetails[],
  }
})

export async function generateMetadata(props: {
  params: Promise<{ id: number }>
}) {
  const params = await props.params
  const tv = await getTvWithSeasons(params.id)

  return {
    title: tv.show.name,
    description: tv.show.overview,
  }
}

const TvShowDetailsPage = async (props: {
  params: Promise<{ id: number }>
}) => {
  const supabase = await createServerClient()
  const params = await props.params

  const { id } = params
  const { show, seasons } = await getTvWithSeasons(id)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from("user_progress")
    .select("*")
    .eq("show_id", id)
    .eq("user", user!.id)
    .single()

  return (
    <Container maxW="[768px]" pt="20">
      <Flex direction="row" gap="3">
        <Flex direction="column" gap="3">
          <Heading as="h1" size="2xl">
            {show.name}
          </Heading>

          <Flex gap="1">
            {show.genres.map((genre) => (
              <Badge key={genre.id}>{genre.name}</Badge>
            ))}
          </Flex>

          <Text>{show.overview}</Text>
        </Flex>

        {show.poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
            alt={show.name}
            width={200}
            height={300}
          />
        )}
      </Flex>

      <EpisodeOverview
        seasons={seasons}
        showId={show.id}
        user={user!}
        userProgress={{
          id: data ? data.id : undefined,
          watched_episodes: data ? data.watched_episodes || [] : [],
        }}
      />
    </Container>
  )
}

export default TvShowDetailsPage
