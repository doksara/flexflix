import { useMemo } from "react";
import type { ElementType } from "react";
import { useShallow } from "zustand/react/shallow";

import { MediaType, useMovieGenres, useTvGenres } from "@/entities/media";
import { ACTIVITY_ICONS, activityText, useWatchlistStore, WatchStatus, watchlistKey } from "@/entities/watchlist";
import { STATUS_LABELS } from "@/features/add-to-watchlist";
import { formatDate, formatRelativeTime } from "@/shared/lib/date";

export interface StatCard {
  label: string;
  value: string;
}

export interface StatusBreakdownItem {
  status: WatchStatus;
  label: string;
  count: number;
  pct: number;
}

export interface GenreDistributionItem {
  name: string;
  count: number;
  pct: number;
}

export interface ActivityItem {
  id: string;
  icon: ElementType;
  text: string;
  timeLabel: string;
}

export interface ProfileStatsViewModel {
  memberSinceLabel: string | null;
  statCards: StatCard[];
  statusBreakdown: StatusBreakdownItem[];
  hasEntries: boolean;
  genreDistribution: GenreDistributionItem[];
  genresLoading: boolean;
  recentActivity: ActivityItem[];
}

export function useProfileStats(): ProfileStatsViewModel {
  const entries = useWatchlistStore(useShallow((state) => Object.values(state.entries)));
  const watchLater = useWatchlistStore(useShallow((state) => Object.values(state.watchLater)));
  const activityLog = useWatchlistStore((state) => state.activityLog);
  const episodesWatched = useWatchlistStore((state) =>
    Object.values(state.tvProgress).reduce(
      (sum, progress) =>
        sum + Object.values(progress.watchedEpisodes).reduce((s, eps) => s + eps.length, 0),
      0,
    ),
  );

  const { data: movieGenres, isPending: movieGenresPending } = useMovieGenres();
  const { data: tvGenres, isPending: tvGenresPending } = useTvGenres();
  const genresLoading = movieGenresPending || tvGenresPending;

  return useMemo(() => {
    const titleByKey = new Map<string, string>();
    for (const entry of entries) titleByKey.set(watchlistKey(entry.mediaType, entry.tmdbId), entry.title);
    for (const entry of watchLater) titleByKey.set(watchlistKey(entry.mediaType, entry.tmdbId), entry.title);

    function titleOf(mediaType: MediaType, tmdbId: number): string {
      return (
        titleByKey.get(watchlistKey(mediaType, tmdbId)) ??
        (mediaType === MediaType.Movie ? "a movie" : "a show")
      );
    }

    const ratedEntries = entries.filter((entry) => entry.userRating !== null);
    const avgRating = ratedEntries.length
      ? ratedEntries.reduce((sum, entry) => sum + (entry.userRating ?? 0), 0) / ratedEntries.length
      : null;

    const statCards: StatCard[] = [
      { label: "Titles in your library", value: String(entries.length) },
      { label: "Episodes watched", value: String(episodesWatched) },
      { label: "Average rating", value: avgRating !== null ? `${avgRating.toFixed(1)}/10` : "—" },
    ];

    const statusCounts = new Map<WatchStatus, number>(Object.values(WatchStatus).map((status) => [status, 0]));
    for (const entry of entries) statusCounts.set(entry.status, (statusCounts.get(entry.status) ?? 0) + 1);
    const statusBreakdown: StatusBreakdownItem[] = Object.values(WatchStatus).map((status) => ({
      status,
      label: STATUS_LABELS[status],
      count: statusCounts.get(status) ?? 0,
      pct: entries.length
        ? Math.min(100, Math.round(((statusCounts.get(status) ?? 0) / entries.length) * 100))
        : 0,
    }));

    const movieGenreNames = new Map((movieGenres?.genres ?? []).map((g) => [g.id, g.name]));
    const tvGenreNames = new Map((tvGenres?.genres ?? []).map((g) => [g.id, g.name]));
    const genreCounts = new Map<string, number>();
    for (const entry of entries) {
      const names = entry.mediaType === MediaType.Movie ? movieGenreNames : tvGenreNames;
      for (const genreId of entry.genreIds) {
        const name = names.get(genreId);
        if (!name) continue;
        genreCounts.set(name, (genreCounts.get(name) ?? 0) + 1);
      }
    }
    const totalGenreTags = [...genreCounts.values()].reduce((sum, count) => sum + count, 0);
    const genreDistribution: GenreDistributionItem[] = [...genreCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        count,
        pct: totalGenreTags ? Math.min(100, Math.round((count / totalGenreTags) * 100)) : 0,
      }));

    const recentActivity: ActivityItem[] = activityLog
      .slice(-8)
      .reverse()
      .map((event) => ({
        id: event.id,
        icon: ACTIVITY_ICONS[event.type],
        text: activityText(event, titleOf, (status) => STATUS_LABELS[status]),
        timeLabel: formatRelativeTime(event.timestamp),
      }));

    return {
      memberSinceLabel: activityLog.length > 0 ? formatDate(activityLog[0].timestamp) : null,
      statCards,
      statusBreakdown,
      hasEntries: entries.length > 0,
      genreDistribution,
      genresLoading,
      recentActivity,
    };
  }, [entries, watchLater, activityLog, episodesWatched, movieGenres, tvGenres, genresLoading]);
}
