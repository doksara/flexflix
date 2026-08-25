import { Check, Plus } from "lucide-react";

import type { TmdbEpisode } from "@/shared/api";
import { stillUrl } from "@/shared/lib/image";
import { Badge } from "@/shared/ui/badge";
import { IconButton } from "@/shared/ui/icon-button";

interface EpisodeGridCardProps {
  episode: TmdbEpisode;
  isWatched: boolean;
  isNext: boolean;
  onToggle: () => void;
}

export function EpisodeGridCard({ episode, isWatched, isNext, onToggle }: EpisodeGridCardProps) {
  const still = stillUrl(episode.still_path);

  return (
    <div
      onClick={() => {
        if (!isWatched) onToggle();
      }}
      className="cursor-pointer overflow-hidden rounded-xl bg-[var(--surface-container-highest)]"
    >
      <div className="relative aspect-video bg-[var(--surface-variant)]">
        {still && <img src={still} alt="" className="h-full w-full object-cover" />}
        <div className="absolute inset-0" style={{ background: "var(--scrim-bottom)" }} />
        <span className="absolute top-2.5 left-3 font-heading text-[1.6rem] font-extrabold text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]">
          {episode.episode_number}
        </span>
        <div className="absolute top-3 right-3">
          <IconButton
            icon={isWatched ? Check : Plus}
            variant={isWatched ? "secondary" : "ghost"}
            size="sm"
            shape="round"
            aria-label={isWatched ? "Mark episode unwatched" : "Mark episode watched"}
            onClick={(event) => {
              event.stopPropagation();
              onToggle();
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5 px-4 pt-3.5 pb-[18px]">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="font-heading text-[1rem] font-bold text-foreground">{episode.name}</span>
          {isNext && <Badge variant="default">Next up</Badge>}
        </div>
        <p className="line-clamp-2 max-w-[46ch] text-[0.8125rem] text-[var(--on-surface-variant)]">
          {episode.air_date}
          {episode.air_date && episode.overview ? " · " : ""}
          {episode.overview}
        </p>
      </div>
    </div>
  );
}
