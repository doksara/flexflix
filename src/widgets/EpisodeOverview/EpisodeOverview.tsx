"use client"

import { SeasonDetails } from "@/core/api/interface"
import { useMemo, useReducer, useState } from "react"
import { reducer, ReducerActionType, State } from "./reducer"
import { SeasonProgress } from "./components/SeasonProgress/SeasonProgress"

import { Button, Heading, Progress } from "@/shared/ui"

const initialState: State = {
  watchedShows: [],
}

export const EpisodeOverview = ({
  seasons,
  showId,
  initialWatchedEpisodes,
}: {
  seasons: SeasonDetails[]
  showId: number
  initialWatchedEpisodes: number[]
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [state, dispatch] = useReducer(reducer, {
    watchedShows: initialWatchedEpisodes,
  })

  const totalEpisodeCount = useMemo(() => {
    return seasons.reduce((acc, item) => {
      return item.episodes?.length ? acc + item.episodes.length : acc
    }, 0)
  }, [seasons])

  const onChange = (checked: boolean, id: number) => {
    dispatch({
      type: checked
        ? ReducerActionType.MARK_WATCHED
        : ReducerActionType.MARK_NOT_WATCHED,
      payload: id,
    })
  }

  const onSaveProgress = () => {
    console.log("yoyo")
  }

  if (!seasons) return <p>yolo</p>

  return (
    <>
      <Heading as="h2">Overall progress</Heading>

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

      <Button loading={isLoading} onClick={onSaveProgress} mt="2">
        Save progress
      </Button>
    </>
  )
}
