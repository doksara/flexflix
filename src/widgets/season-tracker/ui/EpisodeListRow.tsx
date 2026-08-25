import { Check, Plus } from "lucide-react";

import type { TmdbEpisode } from "@/shared/api";
import { stillUrl } from "@/shared/lib/image";
import { Badge } from "@/shared/ui/badge";
import { IconButton } from "@/shared/ui/icon-button";

interface EpisodeListRowProps {
  episode: TmdbEpisode;
  isWatched: boolean;
  isNext: boolean;
  onToggle: () => void;
}

export function EpisodeListRow({ episode, isWatched, isNext, onToggle }: EpisodeListRowProps) {
  const still = stillUrl(episode.still_path);

  return (
    <div
      onClick={() => {
        if (!isWatched) onToggle();
      }}
      className="grid cursor-pointer grid-cols-[248px_1fr_auto] items-center gap-[22px] rounded-xl bg-[var(--surface-container)] p-3.5 max-md:grid-cols-[140px_1fr_auto] max-md:gap-4"
    >
      <div className="relative aspect-video overflow-hidden rounded-lg bg-[var(--surface-variant)]">
        {still && <img src={still} alt="" className="h-full w-full object-cover" />}
        <span className="absolute top-2 left-2.5 font-heading text-2xl font-extrabold text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]">
          {episode.episode_number}
        </span>
      </div>

      <div className="flex min-w-0 flex-col gap-[7px]">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="font-heading text-[1.25rem] font-bold tracking-[-0.004em] text-foreground">
            {episode.name}
          </span>
          {episode.air_date && (
            <span className="text-[0.8125rem] text-[var(--on-surface-variant)]">
              {episode.air_date}
            </span>
          )}
          {isNext && <Badge variant="default">Next up</Badge>}
          {isWatched && (
            <Badge variant="success">
              <Check data-icon="inline-start" />
              Watched
            </Badge>
          )}
        </div>
        {episode.overview && (
          <p className="line-clamp-2 max-w-[62ch] text-[0.9375rem] text-[var(--on-surface-variant)]">
            {episode.overview}
          </p>
        )}
      </div>

      <div className="flex items-center pr-2">
        <IconButton
          icon={isWatched ? Check : Plus}
          variant={isWatched ? "secondary" : "ghost"}
          size="md"
          shape="round"
          aria-label={isWatched ? "Mark episode unwatched" : "Mark episode watched"}
          onClick={(event) => {
            event.stopPropagation();
            onToggle();
          }}
        />
      </div>
    </div>
  );
}
