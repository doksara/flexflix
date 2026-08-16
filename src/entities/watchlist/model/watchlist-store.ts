import { create } from "zustand";
import { persist } from "zustand/middleware";

import { MediaType } from "@/entities/media/@x/watchlist";

import type {
  ActivityEvent,
  ActivityEventType,
  TvShowProgress,
  WatchLaterEntry,
  WatchlistEntry,
} from "./watchlist";
import { WatchStatus, watchlistKey } from "./watchlist";

interface WatchlistState {
  entries: Record<string, WatchlistEntry>;
  watchLater: Record<string, WatchLaterEntry>;
  tvProgress: Record<number, TvShowProgress>;
  activityLog: ActivityEvent[];

  addToWatchlist: (params: {
    tmdbId: number;
    mediaType: MediaType;
    title: string;
    posterPath: string | null;
    genreIds: number[];
    status?: WatchStatus;
  }) => void;
  removeFromWatchlist: (mediaType: MediaType, tmdbId: number) => void;
  setStatus: (mediaType: MediaType, tmdbId: number, status: WatchStatus) => void;
  setRating: (mediaType: MediaType, tmdbId: number, rating: number | null) => void;
  setNotes: (mediaType: MediaType, tmdbId: number, notes: string) => void;

  toggleEpisodeWatched: (
    tmdbId: number,
    seasonNumber: number,
    episodeNumber: number,
  ) => void;
  markSeasonCompleted: (tmdbId: number, seasonNumber: number) => void;

  addToWatchLater: (entry: {
    tmdbId: number;
    mediaType: MediaType;
    title: string;
    posterPath: string | null;
  }) => void;
  removeFromWatchLater: (mediaType: MediaType, tmdbId: number) => void;
  promoteToWatchlist: (mediaType: MediaType, tmdbId: number) => void;
}

function now(): string {
  return new Date().toISOString();
}

function makeActivityEvent(
  type: ActivityEventType,
  mediaType: MediaType,
  tmdbId: number,
  metadata?: Record<string, unknown>,
): ActivityEvent {
  return {
    id: crypto.randomUUID(),
    type,
    tmdbId,
    mediaType,
    timestamp: now(),
    metadata,
  };
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set, get) => ({
      entries: {},
      watchLater: {},
      tvProgress: {},
      activityLog: [],

      addToWatchlist: ({ tmdbId, mediaType, title, posterPath, genreIds, status }) => {
        const key = watchlistKey(mediaType, tmdbId);
        const timestamp = now();
        const entry: WatchlistEntry = {
          tmdbId,
          mediaType,
          title,
          posterPath,
          genreIds,
          status: status ?? WatchStatus.PlanToWatch,
          userRating: null,
          addedAt: timestamp,
          updatedAt: timestamp,
          notes: "",
        };
        set((state) => ({
          entries: { ...state.entries, [key]: entry },
          activityLog: [
            ...state.activityLog,
            makeActivityEvent("added_to_watchlist", mediaType, tmdbId),
          ],
        }));
      },

      removeFromWatchlist: (mediaType, tmdbId) => {
        const key = watchlistKey(mediaType, tmdbId);
        set((state) => {
          const { [key]: _removed, ...entries } = state.entries;
          return {
            entries,
            activityLog: [
              ...state.activityLog,
              makeActivityEvent("removed_from_watchlist", mediaType, tmdbId),
            ],
          };
        });
      },

      setStatus: (mediaType, tmdbId, status) => {
        const key = watchlistKey(mediaType, tmdbId);
        const entry = get().entries[key];
        if (!entry) return;
        set((state) => ({
          entries: {
            ...state.entries,
            [key]: { ...entry, status, updatedAt: now() },
          },
          activityLog: [
            ...state.activityLog,
            makeActivityEvent("status_changed", mediaType, tmdbId, { status }),
          ],
        }));
      },

      setRating: (mediaType, tmdbId, rating) => {
        const key = watchlistKey(mediaType, tmdbId);
        const entry = get().entries[key];
        if (!entry) return;
        set((state) => ({
          entries: {
            ...state.entries,
            [key]: { ...entry, userRating: rating, updatedAt: now() },
          },
          activityLog: [
            ...state.activityLog,
            makeActivityEvent("rating_changed", mediaType, tmdbId, { rating }),
          ],
        }));
      },

      setNotes: (mediaType, tmdbId, notes) => {
        const key = watchlistKey(mediaType, tmdbId);
        const entry = get().entries[key];
        if (!entry) return;
        set((state) => ({
          entries: {
            ...state.entries,
            [key]: { ...entry, notes, updatedAt: now() },
          },
        }));
      },

      toggleEpisodeWatched: (tmdbId, seasonNumber, episodeNumber) => {
        const progress = get().tvProgress[tmdbId] ?? {
          tmdbId,
          watchedEpisodes: {},
          completedSeasons: [],
          updatedAt: now(),
        };
        const watchedInSeason = progress.watchedEpisodes[seasonNumber] ?? [];
        const isWatched = watchedInSeason.includes(episodeNumber);
        const nextWatchedInSeason = isWatched
          ? watchedInSeason.filter((n) => n !== episodeNumber)
          : [...watchedInSeason, episodeNumber];

        const nextProgress: TvShowProgress = {
          ...progress,
          watchedEpisodes: {
            ...progress.watchedEpisodes,
            [seasonNumber]: nextWatchedInSeason,
          },
          updatedAt: now(),
        };

        set((state) => ({
          tvProgress: { ...state.tvProgress, [tmdbId]: nextProgress },
          activityLog: [
            ...state.activityLog,
            makeActivityEvent(
              isWatched ? "episode_unwatched" : "episode_watched",
              MediaType.TvShow,
              tmdbId,
              { seasonNumber, episodeNumber },
            ),
          ],
        }));
      },

      markSeasonCompleted: (tmdbId, seasonNumber) => {
        const progress = get().tvProgress[tmdbId];
        if (!progress || progress.completedSeasons.includes(seasonNumber)) return;
        set((state) => ({
          tvProgress: {
            ...state.tvProgress,
            [tmdbId]: {
              ...progress,
              completedSeasons: [...progress.completedSeasons, seasonNumber],
              updatedAt: now(),
            },
          },
          activityLog: [
            ...state.activityLog,
            makeActivityEvent("season_completed", MediaType.TvShow, tmdbId, {
              seasonNumber,
            }),
          ],
        }));
      },

      addToWatchLater: ({ tmdbId, mediaType, title, posterPath }) => {
        const key = watchlistKey(mediaType, tmdbId);
        set((state) => ({
          watchLater: {
            ...state.watchLater,
            [key]: { tmdbId, mediaType, title, posterPath, addedAt: now() },
          },
          activityLog: [
            ...state.activityLog,
            makeActivityEvent("added_to_watch_later", mediaType, tmdbId),
          ],
        }));
      },

      removeFromWatchLater: (mediaType, tmdbId) => {
        const key = watchlistKey(mediaType, tmdbId);
        set((state) => {
          const { [key]: _removed, ...watchLater } = state.watchLater;
          return {
            watchLater,
            activityLog: [
              ...state.activityLog,
              makeActivityEvent("removed_from_watch_later", mediaType, tmdbId),
            ],
          };
        });
      },

      promoteToWatchlist: (mediaType, tmdbId) => {
        const key = watchlistKey(mediaType, tmdbId);
        const watchLaterEntry = get().watchLater[key];
        if (!watchLaterEntry) return;
        const timestamp = now();
        const entry: WatchlistEntry = {
          tmdbId,
          mediaType,
          title: watchLaterEntry.title,
          posterPath: watchLaterEntry.posterPath,
          genreIds: [],
          status: WatchStatus.PlanToWatch,
          userRating: null,
          addedAt: timestamp,
          updatedAt: timestamp,
          notes: "",
        };
        set((state) => {
          const { [key]: _removed, ...watchLater } = state.watchLater;
          return {
            watchLater,
            entries: { ...state.entries, [key]: entry },
            activityLog: [
              ...state.activityLog,
              makeActivityEvent("promoted_to_watchlist", mediaType, tmdbId),
            ],
          };
        });
      },
    }),
    { name: "flexflix:store" },
  ),
);
