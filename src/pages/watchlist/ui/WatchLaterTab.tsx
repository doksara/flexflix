import { BookmarkPlus } from "lucide-react";

import type { WatchLaterEntry } from "@/entities/watchlist";
import { useWatchlistStore } from "@/entities/watchlist";
import { IconButton } from "@/shared/ui/icon-button";

import { entryToMediaSummary } from "../model/watchlist-page";
import { EmptyState } from "./EmptyState";
import { WatchlistGridItem } from "./WatchlistGridItem";

interface WatchLaterTabProps {
  entries: WatchLaterEntry[];
}

export function WatchLaterTab({ entries }: WatchLaterTabProps) {
  const promoteToWatchlist = useWatchlistStore((state) => state.promoteToWatchlist);

  if (entries.length === 0) {
    return <EmptyState title="Your list is empty." subtitle="Save a title and it waits for you here." />;
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-5">
      {entries.map((entry) => (
        <WatchlistGridItem
          key={`${entry.mediaType}:${entry.tmdbId}`}
          media={entryToMediaSummary(entry)}
          overlayAction={
            <IconButton
              icon={BookmarkPlus}
              variant="secondary"
              size="sm"
              aria-label="Add to Watchlist"
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                promoteToWatchlist(entry.mediaType, entry.tmdbId);
              }}
            />
          }
        />
      ))}
    </div>
  );
}
