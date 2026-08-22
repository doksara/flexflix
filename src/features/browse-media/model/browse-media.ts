import { useQuery } from "@tanstack/react-query";

import { movieToSummary, multiSearchToSummary, tvToSummary } from "@/entities/media";
import { getPopularMovies, getPopularTvShows, getTrendingAllWeek } from "@/shared/api";

export function useTrending() {
  return useQuery({
    queryKey: ["trending", "all", "week"],
    queryFn: async () => {
      const data = await getTrendingAllWeek();
      return data.results
        .map(multiSearchToSummary)
        .filter((item) => item !== null);
    },
  });
}

export function usePopularMovies() {
  return useQuery({
    queryKey: ["movies", "popular"],
    queryFn: async () => {
      const data = await getPopularMovies();
      return data.results.map(movieToSummary);
    },
  });
}

export function usePopularTvShows() {
  return useQuery({
    queryKey: ["tv", "popular"],
    queryFn: async () => {
      const data = await getPopularTvShows();
      return data.results.map(tvToSummary);
    },
  });
}
