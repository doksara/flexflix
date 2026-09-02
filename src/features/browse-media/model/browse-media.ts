import { useQuery } from "@tanstack/react-query";

import { MediaType, movieToSummary, multiSearchToSummary, tvToSummary } from "@/entities/media";
import type { MediaSummary } from "@/entities/media";
import { useWatchlistStore, WatchStatus, watchlistKey } from "@/entities/watchlist";
import {
  getMovieRecommendations,
  getPopularMovies,
  getPopularTvShows,
  getTrendingAllWeek,
  getTvRecommendations,
} from "@/shared/api";

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

const MAX_SUGGESTION_SEEDS = 5;
const MAX_SUGGESTIONS = 20;

export function useSuggestedForYou() {
  const entries = useWatchlistStore((state) => state.entries);
  const watchLater = useWatchlistStore((state) => state.watchLater);

  const seeds = Object.values(entries)
    .filter(
      (entry) =>
        entry.status === WatchStatus.Completed || entry.status === WatchStatus.Watching,
    )
    .sort((a, b) => {
      const ratingDiff = (b.userRating ?? 0) - (a.userRating ?? 0);
      if (ratingDiff !== 0) return ratingDiff;
      return b.updatedAt.localeCompare(a.updatedAt);
    })
    .slice(0, MAX_SUGGESTION_SEEDS);

  const seedKey = seeds
    .map((seed) => watchlistKey(seed.mediaType, seed.tmdbId))
    .sort()
    .join(",");

  return useQuery({
    queryKey: ["suggested-for-you", seedKey],
    queryFn: async () => {
      const seedResults = await Promise.allSettled(
        seeds.map(async (seed) => {
          if (seed.mediaType === MediaType.Movie) {
            const data = await getMovieRecommendations(seed.tmdbId);
            return data.results.map(movieToSummary);
          }
          const data = await getTvRecommendations(seed.tmdbId);
          return data.results.map(tvToSummary);
        }),
      );

      const scored = new Map<string, { summary: MediaSummary; score: number }>();
      for (const result of seedResults) {
        if (result.status !== "fulfilled") continue;
        for (const summary of result.value) {
          const key = watchlistKey(summary.mediaType, summary.id);
          const existing = scored.get(key);
          if (existing) {
            existing.score += 1;
          } else {
            scored.set(key, { summary, score: 1 });
          }
        }
      }

      return Array.from(scored.entries())
        .filter(([key]) => !entries[key] && !watchLater[key])
        .sort((a, b) => {
          const scoreDiff = b[1].score - a[1].score;
          if (scoreDiff !== 0) return scoreDiff;
          return b[1].summary.voteAverage - a[1].summary.voteAverage;
        })
        .slice(0, MAX_SUGGESTIONS)
        .map(([, value]) => value.summary);
    },
    enabled: seeds.length > 0,
  });
}
