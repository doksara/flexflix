import { useQuery } from "@tanstack/react-query";

import { getMovieDetails, getMovieGenres, getSeasonDetails, getTvDetails, getTvGenres } from "@/shared/api";

const GENRES_STALE_TIME = 24 * 60 * 60 * 1000;

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

export function useMovieGenres() {
  return useQuery({
    queryKey: ["genres", "movie"],
    queryFn: getMovieGenres,
    staleTime: GENRES_STALE_TIME,
  });
}

export function useTvGenres() {
  return useQuery({
    queryKey: ["genres", "tv"],
    queryFn: getTvGenres,
    staleTime: GENRES_STALE_TIME,
  });
}
