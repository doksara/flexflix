import { PosterImage, useSeasonDetails } from "@/entities/media";
import { useEpisodeProgress } from "@/features/toggle-episode";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion";

import type { SeasonSummary } from "../model/types";
import { EpisodeRow } from "./EpisodeRow";
import { SeasonProgressBar } from "./SeasonProgressBar";

interface SeasonAccordionProps {
  tvId: number;
  season: SeasonSummary;
  isOpen: boolean;
}

export function SeasonAccordion({ tvId, season, isOpen }: SeasonAccordionProps) {
  const { data: seasonDetails, isLoading } = useSeasonDetails(tvId, season.seasonNumber, isOpen);
  const { watchedEpisodes, toggleEpisode } = useEpisodeProgress(tvId, season.seasonNumber);

  const totalEpisodes = seasonDetails?.episodes.length ?? season.episodeCount;
  const watchedCount = watchedEpisodes.length;

  return (
    <AccordionItem
      value={String(season.seasonNumber)}
      className="overflow-hidden rounded-2xl border-none bg-[var(--surface-container)] px-4"
    >
      <AccordionTrigger className="py-4 hover:no-underline">
        <div className="flex w-full items-center gap-3 pr-2">
          <div className="relative aspect-2/3 w-10 shrink-0 overflow-hidden rounded-md bg-[var(--surface-variant)]">
            <PosterImage posterPath={season.posterPath} title={season.name} fill />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate font-heading text-sm font-bold text-foreground">
                {season.name}
              </span>
              <span className="shrink-0 text-[0.75rem] text-[var(--on-surface-variant)]">
                {watchedCount}/{totalEpisodes}
              </span>
            </div>
            <SeasonProgressBar watched={watchedCount} total={totalEpisodes} />
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {isLoading && (
          <div className="py-4 text-sm text-muted-foreground">Loading episodes…</div>
        )}
        {seasonDetails && (
          <div className="flex flex-col divide-y divide-[var(--surface-variant)]">
            {seasonDetails.episodes.map((episode) => (
              <EpisodeRow
                key={episode.id}
                episode={episode}
                isWatched={watchedEpisodes.includes(episode.episode_number)}
                onToggle={() => toggleEpisode(episode.episode_number, seasonDetails.episodes.length)}
              />
            ))}
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
