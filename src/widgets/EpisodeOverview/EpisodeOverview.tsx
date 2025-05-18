"use client"

import { SeasonDetails } from "@/core/api/interface"
import { useMemo, useReducer, useState } from "react"
import { reducer, ReducerActionType, State } from "./reducer"
import { SeasonProgress } from "./components/SeasonProgress/SeasonProgress"

import { Button, Heading, Progress } from "@/shared/ui"
import { createBrowserClient } from "@/shared/lib"
import { User } from "@supabase/supabase-js"
import { Toast } from "@/shared/ui"

interface UserProgress {
  id: number | undefined
  watched_episodes: number[]
}

const toaster = Toast.createToaster({
  placement: "bottom-end",
  overlap: true,
  gap: 24,
})

export const EpisodeOverview = ({
  seasons,
  showId,
  user,
  userProgress,
}: {
  seasons: SeasonDetails[]
  showId: number
  user: User
  userProgress: UserProgress
}) => {
  const { id, watched_episodes } = userProgress

  const [isLoading, setIsLoading] = useState(false)
  const [state, dispatch] = useReducer(reducer, {
    watchedShows: watched_episodes,
    hasChanges: false,
  })

  const { hasChanges, watchedShows } = state

  const supabase = createBrowserClient()

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

  const onSaveProgress = async () => {
    setIsLoading(true)

    await supabase.from("user_progress").upsert({
      id,
      show_id: showId,
      watched_episodes: state.watchedShows,
      user: user.id,
    })

    setIsLoading(false)

    toaster.create({
      title: "Success",
      description: "Progress saved successfully.",
      type: "success",
    })

    dispatch({ type: ReducerActionType.RESET })
  }

  if (!seasons) return <p>yolo</p>

  return (
    <>
      <Heading as="h2">Overall progress</Heading>

      <Progress
        value={(watchedShows.length / totalEpisodeCount) * 100}
        min={0}
        max={100}
        my="4"
      />

      <SeasonProgress
        seasons={seasons}
        watchedShows={watchedShows}
        onChange={onChange}
      />

      <Button
        loading={isLoading}
        disabled={!hasChanges}
        onClick={onSaveProgress}
        mt="2"
      >
        Save progress
      </Button>

      <Toast.Toaster toaster={toaster}>
        {(toast) => (
          <Toast.Root key={toast.id}>
            <Toast.Title>{toast.title}</Toast.Title>
            <Toast.Description>{toast.description}</Toast.Description>
            <Toast.CloseTrigger>x</Toast.CloseTrigger>
          </Toast.Root>
        )}
      </Toast.Toaster>
    </>
  )
}
