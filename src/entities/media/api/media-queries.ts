import { useQuery } from "@tanstack/react-query";

import {
  getMovieDetails,
  getMovieGenres,
  getMovieRecommendations,
  getSeasonDetails,
  getTvDetails,
  getTvGenres,
  getTvRecommendations,
} from "@/shared/api";

import { MediaType } from "../model/media";
import { movieToSummary, tvToSummary } from "../model/normalize";

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

export function useMoreLikeThis(mediaType: MediaType, id: number) {
  return useQuery({
    queryKey: [mediaType, id, "recommendations"],
    queryFn: async () => {
      if (mediaType === MediaType.Movie) {
        const data = await getMovieRecommendations(id);
        return data.results.map(movieToSummary);
      }
      const data = await getTvRecommendations(id);
      return data.results.map(tvToSummary);
    },
  });
}
