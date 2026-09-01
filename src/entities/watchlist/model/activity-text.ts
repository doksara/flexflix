import {
  Award,
  Bookmark,
  BookmarkX,
  Clock,
  FileText,
  MoveRight,
  RefreshCw,
  Star,
  Tv,
  Undo2,
  X,
} from "lucide-react";
import type { ElementType } from "react";

import type { MediaType } from "@/entities/media/@x/watchlist";

import type { ActivityEvent, ActivityEventType, WatchStatus } from "./watchlist";

export const ACTIVITY_ICONS: Record<ActivityEventType, ElementType> = {
  added_to_watchlist: Bookmark,
  removed_from_watchlist: BookmarkX,
  status_changed: RefreshCw,
  rating_changed: Star,
  notes_changed: FileText,
  episode_watched: Tv,
  episode_unwatched: Undo2,
  season_completed: Award,
  added_to_watch_later: Clock,
  removed_from_watch_later: X,
  promoted_to_watchlist: MoveRight,
};

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function formatEpisodeTag(seasonNumber: number, episodeNumber: number): string {
  return `S${pad(seasonNumber)}E${pad(episodeNumber)}`;
}

export function activityText(
  event: ActivityEvent,
  titleOf: (mediaType: MediaType, tmdbId: number) => string,
  statusLabel: (status: WatchStatus) => string,
): string {
  const title = titleOf(event.mediaType, event.tmdbId);
  const meta = (event.metadata ?? {}) as Record<string, unknown>;

  switch (event.type) {
    case "added_to_watchlist":
      return `Added ${title} to your watchlist`;
    case "removed_from_watchlist":
      return `Removed ${title} from your watchlist`;
    case "status_changed": {
      const status = meta.status as WatchStatus | undefined;
      return status ? `Set ${title} to ${statusLabel(status)}` : `Updated ${title}'s status`;
    }
    case "rating_changed": {
      const rating = meta.rating as number | null | undefined;
      return rating ? `Rated ${title} ${rating}/10` : `Cleared your rating for ${title}`;
    }
    case "notes_changed":
      return `Updated notes for ${title}`;
    case "episode_watched": {
      const { seasonNumber, episodeNumber } = meta as { seasonNumber?: number; episodeNumber?: number };
      return seasonNumber && episodeNumber
        ? `Watched ${title} · ${formatEpisodeTag(seasonNumber, episodeNumber)}`
        : `Watched an episode of ${title}`;
    }
    case "episode_unwatched": {
      const { seasonNumber, episodeNumber } = meta as { seasonNumber?: number; episodeNumber?: number };
      return seasonNumber && episodeNumber
        ? `Marked ${title} ${formatEpisodeTag(seasonNumber, episodeNumber)} as unwatched`
        : `Marked an episode of ${title} as unwatched`;
    }
    case "season_completed": {
      const seasonNumber = meta.seasonNumber as number | undefined;
      return seasonNumber ? `Completed Season ${seasonNumber} of ${title}` : `Completed a season of ${title}`;
    }
    case "added_to_watch_later":
      return `Saved ${title} for later`;
    case "removed_from_watch_later":
      return `Removed ${title} from Watch Later`;
    case "promoted_to_watchlist":
      return `Moved ${title} to your watchlist`;
    default:
      return title;
  }
}
