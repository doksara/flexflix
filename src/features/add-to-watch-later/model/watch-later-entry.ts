import type { MediaType } from "@/entities/media";
import { useWatchlistStore, watchlistKey } from "@/entities/watchlist";

export function useWatchLaterEntry(mediaType: MediaType, tmdbId: number) {
  const entry = useWatchlistStore((state) => state.watchLater[watchlistKey(mediaType, tmdbId)]);
  return { entry, isInWatchLater: entry !== undefined };
}
