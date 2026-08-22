import type { TmdbEpisode } from "@/shared/api";
import { stillUrl } from "@/shared/lib/image";
import { Checkbox } from "@/shared/ui/checkbox";

interface EpisodeRowProps {
  episode: TmdbEpisode;
  isWatched: boolean;
  onToggle: () => void;
}

export function EpisodeRow({ episode, isWatched, onToggle }: EpisodeRowProps) {
  const still = stillUrl(episode.still_path);

  return (
    <label className="flex cursor-pointer items-center gap-3 py-3">
      <Checkbox checked={isWatched} onCheckedChange={onToggle} />
      <div className="relative aspect-video w-24 shrink-0 overflow-hidden rounded-lg bg-[var(--surface-variant)]">
        {still && <img src={still} alt="" className="h-full w-full object-cover" />}
      </div>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="truncate text-sm font-medium text-foreground">
          {episode.episode_number}. {episode.name}
        </span>
        {episode.air_date && (
          <span className="text-[0.75rem] text-[var(--on-surface-variant)]">{episode.air_date}</span>
        )}
      </div>
    </label>
  );
}
