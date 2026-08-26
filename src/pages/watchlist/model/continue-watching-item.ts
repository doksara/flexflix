import { isTrackableSeason, useTvDetails } from "@/entities/media";
import type { MediaSummary } from "@/entities/media";
import type { WatchlistEntry } from "@/entities/watchlist";
import { computeNextEpisode, computeWatchedTotal, useWatchlistStore } from "@/entities/watchlist";
import { backdropUrl } from "@/shared/lib/image";

import { entryToMediaSummary } from "./watchlist-page";

const EMPTY_WATCHED_EPISODES: Record<number, number[]> = {};

export interface ContinueWatchingItemViewModel {
  media: MediaSummary;
  backdropSrc: string | null;
  hasEpisodeData: boolean;
  isDone: boolean;
  watchedTotal: number;
  totalEpisodes: number;
  pct: number;
  nextEpisodeLabel: string | null;
}

export function useContinueWatchingItem(entry: WatchlistEntry): {
  vm: ContinueWatchingItemViewModel | undefined;
  isLoading: boolean;
  isError: boolean;
} {
  const query = useTvDetails(entry.tmdbId);
  const watchedEpisodes = useWatchlistStore(
    (state) => state.tvProgress[entry.tmdbId]?.watchedEpisodes ?? EMPTY_WATCHED_EPISODES,
  );
  const show = query.data;

  if (!show) {
    return { vm: undefined, isLoading: query.isLoading, isError: query.isError };
  }

  const seasons = show.seasons
    .filter(isTrackableSeason)
    .map((season) => ({ seasonNumber: season.season_number, episodeCount: season.episode_count }));
  const totalEpisodes = seasons.reduce((sum, season) => sum + season.episodeCount, 0);
  const watchedTotal = computeWatchedTotal(watchedEpisodes);
  const next = computeNextEpisode(seasons, watchedEpisodes);

  const vm: ContinueWatchingItemViewModel = {
    media: entryToMediaSummary(entry),
    backdropSrc: backdropUrl(show.backdrop_path, "w780"),
    hasEpisodeData: totalEpisodes > 0,
    isDone: totalEpisodes > 0 && next === null,
    watchedTotal,
    totalEpisodes,
    pct: totalEpisodes ? Math.min(100, Math.round((watchedTotal / totalEpisodes) * 100)) : 0,
    nextEpisodeLabel: next
      ? `S${String(next.seasonNumber).padStart(2, "0")}E${String(next.episodeNumber).padStart(2, "0")}`
      : null,
  };

  return { vm, isLoading: false, isError: false };
}
