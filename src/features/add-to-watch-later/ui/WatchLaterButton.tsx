import { Clock } from "lucide-react";

import type { MediaSummary } from "@/entities/media";
import { useWatchlistStore } from "@/entities/watchlist";
import { Button } from "@/shared/ui/button";

import { useWatchLaterEntry } from "../model/watch-later-entry";

interface WatchLaterButtonProps {
  media: MediaSummary;
}

export function WatchLaterButton({ media }: WatchLaterButtonProps) {
  const { isInWatchLater } = useWatchLaterEntry(media.mediaType, media.id);
  const addToWatchLater = useWatchlistStore((state) => state.addToWatchLater);
  const removeFromWatchLater = useWatchlistStore((state) => state.removeFromWatchLater);

  return (
    <Button
      variant={isInWatchLater ? "secondary" : "ghost"}
      size="icon-lg"
      aria-label={isInWatchLater ? "Remove from watch later" : "Watch later"}
      onClick={() =>
        isInWatchLater
          ? removeFromWatchLater(media.mediaType, media.id)
          : addToWatchLater({
              tmdbId: media.id,
              mediaType: media.mediaType,
              title: media.title,
              posterPath: media.posterPath,
              genreIds: media.genreIds,
            })
      }
    >
      <Clock />
    </Button>
  );
}
