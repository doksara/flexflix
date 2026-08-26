import { useShallow } from "zustand/react/shallow";

import { MediaType } from "@/entities/media";
import type { WatchLaterEntry, WatchlistEntry } from "@/entities/watchlist";
import { useWatchlistStore, WatchStatus } from "@/entities/watchlist";

export function useWatchlistEntries(): WatchlistEntry[] {
  return useWatchlistStore(useShallow((state) => Object.values(state.entries)));
}

export function useWatchLaterEntries(): WatchLaterEntry[] {
  return useWatchlistStore(useShallow((state) => Object.values(state.watchLater)));
}

export function useContinueWatchingEntries(): WatchlistEntry[] {
  return useWatchlistStore(
    useShallow((state) =>
      Object.values(state.entries).filter(
        (entry) => entry.mediaType === MediaType.TvShow && entry.status === WatchStatus.Watching,
      ),
    ),
  );
}

export function useTotalEpisodesWatched(): number {
  return useWatchlistStore((state) =>
    Object.values(state.tvProgress).reduce(
      (sum, progress) =>
        sum + Object.values(progress.watchedEpisodes).reduce((s, eps) => s + eps.length, 0),
      0,
    ),
  );
}

export const STATUS_FILTER_ALL = "all" as const;
export type StatusFilter = typeof STATUS_FILTER_ALL | WatchStatus;

export const SORT_OPTIONS = {
  RecentlyAdded: "recently_added",
  Title: "title",
  Rating: "rating",
} as const;
export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];

export function filterAndSortEntries(
  entries: WatchlistEntry[],
  statusFilter: StatusFilter,
  sort: SortOption,
): WatchlistEntry[] {
  const filtered =
    statusFilter === STATUS_FILTER_ALL
      ? entries
      : entries.filter((entry) => entry.status === statusFilter);

  return [...filtered].sort((a, b) => {
    switch (sort) {
      case SORT_OPTIONS.Title:
        return a.title.localeCompare(b.title);
      case SORT_OPTIONS.Rating:
        return (b.userRating ?? -1) - (a.userRating ?? -1);
      case SORT_OPTIONS.RecentlyAdded:
      default:
        return b.addedAt.localeCompare(a.addedAt);
    }
  });
}
