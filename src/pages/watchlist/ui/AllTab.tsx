import { BookmarkX } from "lucide-react";
import { useState } from "react";

import { STATUS_LABELS } from "@/features/add-to-watchlist";
import type { WatchlistEntry } from "@/entities/watchlist";
import { useWatchlistStore, WatchStatus } from "@/entities/watchlist";
import { Badge } from "@/shared/ui/badge";
import { IconButton } from "@/shared/ui/icon-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";

import {
  filterAndSortEntries,
  SORT_OPTIONS,
  STATUS_FILTER_ALL,
  type SortOption,
  type StatusFilter,
} from "../model/watchlist-page";
import { EmptyState } from "./EmptyState";
import { WatchlistGridItem } from "./WatchlistGridItem";

const SORT_LABELS: Record<SortOption, string> = {
  [SORT_OPTIONS.RecentlyAdded]: "Recently added",
  [SORT_OPTIONS.Title]: "Title",
  [SORT_OPTIONS.Rating]: "Rating",
};

interface AllTabProps {
  entries: WatchlistEntry[];
}

export function AllTab({ entries }: AllTabProps) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>(STATUS_FILTER_ALL);
  const [sort, setSort] = useState<SortOption>(SORT_OPTIONS.RecentlyAdded);
  const removeFromWatchlist = useWatchlistStore((state) => state.removeFromWatchlist);

  if (entries.length === 0) {
    return (
      <EmptyState
        title="Your watchlist is empty."
        subtitle="Add a title from Discover and track it here."
      />
    );
  }

  const visible = filterAndSortEntries(entries, statusFilter, sort);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
          <SelectTrigger aria-label="Filter by status" className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={STATUS_FILTER_ALL}>All statuses</SelectItem>
            {Object.values(WatchStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {STATUS_LABELS[status]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(value) => setSort(value as SortOption)}>
          <SelectTrigger aria-label="Sort by" className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.values(SORT_OPTIONS).map((option) => (
              <SelectItem key={option} value={option}>
                {SORT_LABELS[option]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {visible.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">No titles match this filter.</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-5">
          {visible.map((entry) => (
            <WatchlistGridItem
              key={`${entry.mediaType}:${entry.tmdbId}`}
              media={{
                id: entry.tmdbId,
                mediaType: entry.mediaType,
                title: entry.title,
                posterPath: entry.posterPath,
                releaseDate: null,
                voteAverage: 0,
                genreIds: entry.genreIds,
              }}
              badge={<Badge variant="default">{STATUS_LABELS[entry.status]}</Badge>}
              overlayAction={
                <IconButton
                  icon={BookmarkX}
                  variant="secondary"
                  size="sm"
                  aria-label="Remove from Watchlist"
                  onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    removeFromWatchlist(entry.mediaType, entry.tmdbId);
                  }}
                />
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
