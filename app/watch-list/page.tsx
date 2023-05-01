import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"
import { NextPage } from "next"

interface WatchListProps {}

const WatchList: NextPage<WatchListProps> = () => {
  const user = useUser()
  const supabaseClient = useSupabaseClient()

  return <p>a</p>
}

export default WatchList
