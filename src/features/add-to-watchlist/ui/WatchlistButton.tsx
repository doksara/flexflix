import { Bookmark, BookmarkCheck } from "lucide-react";

import type { MediaSummary } from "@/entities/media";
import { useWatchlistStore } from "@/entities/watchlist";
import { Button } from "@/shared/ui/button";

import { useWatchlistEntry } from "../model/watchlist-entry";

interface WatchlistButtonProps {
  media: MediaSummary;
}

export function WatchlistButton({ media }: WatchlistButtonProps) {
  const { isInWatchlist } = useWatchlistEntry(media.mediaType, media.id);
  const addToWatchlist = useWatchlistStore((state) => state.addToWatchlist);
  const removeFromWatchlist = useWatchlistStore((state) => state.removeFromWatchlist);

  if (isInWatchlist) {
    return (
      <Button
        variant="default"
        size="lg"
        onClick={() => removeFromWatchlist(media.mediaType, media.id)}
      >
        <BookmarkCheck />
        In Watchlist
      </Button>
    );
  }

  return (
    <Button
      variant="secondary"
      size="lg"
      onClick={() =>
        addToWatchlist({
          tmdbId: media.id,
          mediaType: media.mediaType,
          title: media.title,
          posterPath: media.posterPath,
          genreIds: media.genreIds,
        })
      }
    >
      <Bookmark />
      Add to Watchlist
    </Button>
  );
}
