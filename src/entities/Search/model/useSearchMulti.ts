import useSWR from "swr"
import { multi } from "../api"
import { ApiResponse, MultiSearchResult } from "@/shared/lib/tmdb/interface"

export const useSearchMulti = (query: string) => {
  const { data, isLoading, error } = useSWR<ApiResponse<MultiSearchResult>>(
    query ? multi(query) : null
  )

  return { data, isLoading, error }
}
