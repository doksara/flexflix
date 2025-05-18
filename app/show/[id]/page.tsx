import Head from "next/head"
import {
  MissingResource,
  SeasonDetails,
  TvShowDetails,
} from "@/core/api/interface"

import { Container, Flex } from "styled-system/jsx"
import { EpisodeOverview } from "@/widgets/EpisodeOverview/EpisodeOverview"
import { Badge, Heading, Text } from "@/shared/ui"
import Image from "next/image"
import { promiseWhen, getJson } from "@/shared/lib/http"
import { createServerClient } from "@/shared/lib"

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
  params: Promise<{ id: number }>
}) => {
  const supabase = await createServerClient()
  const params = await props.params

  const { id } = params
  const { show, seasons } = await getData(id)

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
    <>
      <Head>
        <title>Test :: flexflix</title>
      </Head>

      <Container maxW="3xl" pt="20">
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
    </>
  )
}

export default TvShowDetailsPage
