import type { MediaType } from "@/entities/media";
import { useWatchlistStore, WatchStatus } from "@/entities/watchlist";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

import { useWatchlistEntry } from "../model/watchlist-entry";

export const STATUS_LABELS: Record<WatchStatus, string> = {
  [WatchStatus.PlanToWatch]: "Plan to Watch",
  [WatchStatus.Watching]: "Watching",
  [WatchStatus.Completed]: "Completed",
  [WatchStatus.Dropped]: "Dropped",
  [WatchStatus.OnHold]: "On Hold",
};

interface StatusSelectProps {
  mediaType: MediaType;
  tmdbId: number;
}

export function StatusSelect({ mediaType, tmdbId }: StatusSelectProps) {
  const { entry, isInWatchlist } = useWatchlistEntry(mediaType, tmdbId);
  const setStatus = useWatchlistStore((state) => state.setStatus);

  if (!isInWatchlist || !entry) return null;

  return (
    <Select
      value={entry.status}
      onValueChange={(value) => setStatus(mediaType, tmdbId, value as WatchStatus)}
    >
      <SelectTrigger aria-label="Watch status">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.values(WatchStatus).map((status) => (
          <SelectItem key={status} value={status}>
            {STATUS_LABELS[status]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
