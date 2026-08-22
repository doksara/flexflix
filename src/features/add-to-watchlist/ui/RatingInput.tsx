import { Star } from "lucide-react";

import type { MediaType } from "@/entities/media";
import { useWatchlistStore } from "@/entities/watchlist";
import { cn } from "@/shared/lib/tailwind";

import { useWatchlistEntry } from "../model/watchlist-entry";

interface RatingInputProps {
  mediaType: MediaType;
  tmdbId: number;
}

export function RatingInput({ mediaType, tmdbId }: RatingInputProps) {
  const { entry, isInWatchlist } = useWatchlistEntry(mediaType, tmdbId);
  const setRating = useWatchlistStore((state) => state.setRating);

  if (!isInWatchlist || !entry) return null;

  const rating = entry.userRating;

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
            onClick={() => setRating(mediaType, tmdbId, rating === value ? null : value)}
            className="cursor-pointer p-0.5 text-muted-foreground transition-colors hover:text-secondary"
          >
            <Star className={cn("size-4", filled && "fill-secondary text-secondary")} />
          </button>
        );
      })}
    </div>
  );
}
