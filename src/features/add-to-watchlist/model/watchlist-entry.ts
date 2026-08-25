import type { MediaType } from "@/entities/media";
import { useWatchlistStore, watchlistKey } from "@/entities/watchlist";

export function useWatchlistEntry(mediaType: MediaType, tmdbId: number) {
  const entry = useWatchlistStore((state) => state.entries[watchlistKey(mediaType, tmdbId)]);
  return { entry, isInWatchlist: entry !== undefined };
}
