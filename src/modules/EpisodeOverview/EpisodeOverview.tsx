"use client"

import { SeasonDetails } from "@/core/api/interface"
import { useCallback, useEffect, useMemo, useReducer, useState } from "react"
import { Database } from "../../lib/supabase/database.types"
import { reducer, ReducerActionType, State } from "./reducer"
import { SeasonProgress } from "./components/SeasonProgress/SeasonProgress"
import useWatchProgress from "./hooks/useWatchProgress"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button, Heading, Progress } from "@/shared/ui"

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

  const supabaseClient = createClientComponentClient<Database>()

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

  const onChange = useCallback(
    (checked: boolean, id: string) => {
      dispatch({
        type: checked
          ? ReducerActionType.MARK_WATCHED
          : ReducerActionType.MARK_NOT_WATCHED,
        payload: id,
      })
    },
    [dispatch]
  )

  const onSaveProgress = async () => {
    setIsLoading(true)

    const watchedShowIds = state.watchedShows
    const user = await supabaseClient.auth.getSession()
    console.log(user)
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
  console.log(seasons)
  return (
    <>
      <Heading>Overall progress</Heading>

      <Progress
        value={(state.watchedShows.length / totalEpisodeCount) * 100}
        min={0}
        max={100}
        my="4"
      />

      <SeasonProgress
        seasons={seasons}
        watchedShows={state.watchedShows}
        onChange={onChange}
      />

      <Button loading={isLoading} onClick={onSaveProgress}>
        Save progress
      </Button>
    </>
  )
}
