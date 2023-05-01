import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import { Database } from "../../../lib/supabase/database.types"

export default function useWatchProgress(showId: number) {
  const [watchedEpisodes, setWatchedEpisodes] = useState<string[]>()
  const [error, setError] = useState<string | null>(null)
  const supabaseClient = useSupabaseClient<Database>()
  const user = useUser()

  useEffect(() => {
    if (user) {
      supabaseClient
        .from("user_tvshow")
        .select("watched_episodes")
        .eq("user", user.id)
        .eq("show_id", showId)
        .single()
        .then(
          (res: PostgrestSingleResponse<{ watched_episodes: string[] }>) => {
            if (res.data) {
              setError(null)
              setWatchedEpisodes(res.data.watched_episodes)
            } else if (res.error) {
              setError(res.error.message)
              setWatchedEpisodes([])
            }
          }
        )
    }
  }, [showId, supabaseClient, user])

  return {
    watchedEpisodes,
    error,
  }
}
