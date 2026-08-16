import type { MediaType } from "@/entities/media/@x/watchlist";

export const WatchStatus = {
  PlanToWatch: "plan_to_watch",
  Watching: "watching",
  Completed: "completed",
  Dropped: "dropped",
  OnHold: "on_hold",
} as const;

export type WatchStatus = (typeof WatchStatus)[keyof typeof WatchStatus];

export interface WatchlistEntry {
  tmdbId: number;
  mediaType: MediaType;
  title: string;
  posterPath: string | null;
  genreIds: number[];
  status: WatchStatus;
  userRating: number | null;
  addedAt: string;
  updatedAt: string;
  notes: string;
}

export interface TvShowProgress {
  tmdbId: number;
  watchedEpisodes: Record<number, number[]>;
  completedSeasons: number[];
  updatedAt: string;
}

export interface WatchLaterEntry {
  tmdbId: number;
  mediaType: MediaType;
  title: string;
  posterPath: string | null;
  addedAt: string;
}

export type ActivityEventType =
  | "added_to_watchlist"
  | "removed_from_watchlist"
  | "status_changed"
  | "rating_changed"
  | "episode_watched"
  | "episode_unwatched"
  | "season_completed"
  | "added_to_watch_later"
  | "removed_from_watch_later"
  | "promoted_to_watchlist";

export interface ActivityEvent {
  id: string;
  type: ActivityEventType;
  tmdbId: number;
  mediaType: MediaType;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export function watchlistKey(mediaType: MediaType, tmdbId: number): string {
  return `${mediaType}:${tmdbId}`;
}
