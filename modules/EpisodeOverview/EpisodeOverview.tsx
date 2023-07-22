"use client"

import { Progress, Text, Button, Loading } from "@nextui-org/react"
import { SeasonDetails } from "../../interface"
import { useEffect, useMemo, useReducer, useState } from "react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { Database } from "../../lib/supabase/database.types"
import { useSearchParams } from "next/navigation"
import { reducer, ReducerActionType, State } from "./reducer"
import { SeasonProgress } from "./components/SeasonProgress/SeasonProgress"
import useWatchProgress from "./hooks/useWatchProgress"

const initialState: State = {
  watchedShows: [],
}

export const EpisodeOverview = ({
  seasons,
  showId,
}: {
  seasons: SeasonDetails[]
  showId: number
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState(false)

  const supabaseClient = useSupabaseClient<Database>()
  const user = useUser()

  const { watchedEpisodes, error } = useWatchProgress(showId)

  useEffect(() => {
    if (watchedEpisodes) {
      dispatch({
        type: ReducerActionType.SET_BATCH,
        payload: watchedEpisodes,
      })
    }
  }, [watchedEpisodes])

  const totalEpisodeCount = useMemo(() => {
    return seasons.reduce((acc, item) => {
      return item.episodes?.length ? acc + item.episodes.length : acc
    }, 0)
  }, [seasons])

  const onChange = (checked: boolean, id: string) => {
    dispatch({
      type: checked
        ? ReducerActionType.MARK_WATCHED
        : ReducerActionType.MARK_NOT_WATCHED,
      payload: id,
    })
  }

  const onSaveProgress = async () => {
    setIsLoading(true)

    const watchedShowIds = state.watchedShows

    const existingRowId = await supabaseClient
      .from("user_tvshow")
      .select("id")
      .eq("show_id", showId)
      .eq("user", user?.id)
      .then((res) => {
        if (res.data && res.data.length) {
          return res.data[0].id
        }
      })

    await supabaseClient.from("user_tvshow").upsert({
      id: existingRowId,
      has_started_watching: true,
      watched_episodes: watchedShowIds,
      user: user?.id,
      show_id: Number(showId),
    })

    setIsLoading(false)
  }

  if (!seasons) return <p>yolo</p>

  return (
    <>
      <Text>Overall progress</Text>
      <Progress
        color="gradient"
        value={(state.watchedShows.length / totalEpisodeCount) * 100}
        css={{ marginBottom: "$20" }}
      />

      {seasons.map((season) => (
        <SeasonProgress
          key={season.id}
          season={season}
          watchedShows={state.watchedShows}
          onChange={onChange}
        />
      ))}

      <Button
        disabled={isLoading}
        onPress={onSaveProgress}
        color="primary"
        css={{ px: "$13", w: "100%" }}
      >
        {isLoading ? (
          <Loading color="currentColor" size="sm" />
        ) : (
          <span>Save progress</span>
        )}
      </Button>
    </>
  )
}
