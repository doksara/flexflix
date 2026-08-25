import { useQuery } from "@tanstack/react-query";

import { getMovieDetails, getSeasonDetails, getTvDetails } from "@/shared/api";

export function useMovieDetails(id: number) {
  return useQuery({
    queryKey: ["movie", id, "details"],
    queryFn: () => getMovieDetails(id),
  });
}

export function useTvDetails(id: number) {
  return useQuery({
    queryKey: ["tv", id, "details"],
    queryFn: () => getTvDetails(id),
  });
}

export function useSeasonDetails(tvId: number, seasonNumber: number, enabled: boolean) {
  return useQuery({
    queryKey: ["tv", tvId, "season", seasonNumber],
    queryFn: () => getSeasonDetails(tvId, seasonNumber),
    enabled,
  });
}
