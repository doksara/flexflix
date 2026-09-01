import { toast } from "sonner";

import { isTrackableSeason, MediaType } from "@/entities/media";
import { useWatchlistStore, WatchStatus } from "@/entities/watchlist";
import { getSeasonDetails, getTvDetails } from "@/shared/api";
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
  const markShowCompleted = useWatchlistStore((state) => state.markShowCompleted);

  if (!isInWatchlist || !entry) return null;

  async function handleStatusChange(value: string) {
    const status = value as WatchStatus;
    setStatus(mediaType, tmdbId, status);
    toast.success(`Status set to ${STATUS_LABELS[status]}`);

    if (mediaType !== MediaType.TvShow || status !== WatchStatus.Completed) return;

    try {
      const show = await getTvDetails(tmdbId);
      const seasonEpisodes = await Promise.all(
        show.seasons.filter(isTrackableSeason).map(async (season) => ({
          seasonNumber: season.season_number,
          episodeNumbers: (await getSeasonDetails(tmdbId, season.season_number)).episodes.map(
            (episode) => episode.episode_number,
          ),
        })),
      );
      markShowCompleted(tmdbId, seasonEpisodes);
    } catch {
      toast.error("Marked as Completed, but couldn't mark all episodes as watched");
    }
  }

  return (
    <Select value={entry.status} onValueChange={handleStatusChange}>
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
