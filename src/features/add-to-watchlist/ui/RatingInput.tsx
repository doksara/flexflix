import { Star } from "lucide-react";
import { toast } from "sonner";

import { MediaType } from "@/entities/media";
import { useWatchlistStore, WatchStatus } from "@/entities/watchlist";
import { cn } from "@/shared/lib/tailwind";

import { markAllEpisodesWatchedForShow } from "../model/complete-tv-show";
import { useWatchlistEntry } from "../model/watchlist-entry";

interface RatingInputProps {
  mediaType: MediaType;
  tmdbId: number;
}

export function RatingInput({ mediaType, tmdbId }: RatingInputProps) {
  const { entry, isInWatchlist } = useWatchlistEntry(mediaType, tmdbId);
  const setRating = useWatchlistStore((state) => state.setRating);
  const setStatus = useWatchlistStore((state) => state.setStatus);

  if (!isInWatchlist || !entry) return null;

  const rating = entry.userRating;

  async function handleRate(value: number) {
    const next = rating === value ? null : value;
    setRating(mediaType, tmdbId, next);
    if (next === null) return;

    toast.success(`Rated ${next}/10`);
    setStatus(mediaType, tmdbId, WatchStatus.Completed);

    if (mediaType !== MediaType.TvShow) return;
    try {
      await markAllEpisodesWatchedForShow(tmdbId);
    } catch {
      toast.error("Marked as Completed, but couldn't mark all episodes as watched");
    }
  }

  return (
    <div role="radiogroup" aria-label="Your rating" className="flex items-center gap-0.5">
      {Array.from({ length: 10 }, (_, index) => index + 1).map((value) => {
        const filled = rating !== null && value <= rating;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={rating === value}
            aria-label={`Rate ${value} of 10`}
            onClick={() => {
              void handleRate(value);
            }}
            className="cursor-pointer p-0.5 text-muted-foreground transition-colors hover:text-secondary"
          >
            <Star className={cn("size-4", filled && "fill-secondary text-secondary")} />
          </button>
        );
      })}
    </div>
  );
}
