import useSWR from "swr"
import { multi } from "../api"
import { ApiResponse, TVShow } from "@/core/api/interface"

export const useSearchMulti = (query: string) => {
  const { data, isLoading, error } = useSWR<ApiResponse<TVShow>>(
    query ? multi(query) : null
  )

  return { data, isLoading, error }
}
