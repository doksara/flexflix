import { LayoutGrid, List } from "lucide-react";
import { useEffect, useState } from "react";

import type { MediaSummary, SeasonSummary } from "@/entities/media";
import { useSeasonDetails } from "@/entities/media";
import { useEpisodeProgress } from "@/features/toggle-episode";
import { useWatchlistStore, WatchStatus, watchlistKey } from "@/entities/watchlist";
import { Button } from "@/shared/ui/button";
import { Tag } from "@/shared/ui/tag";
import { cn } from "@/shared/lib/tailwind";

import { EpisodeGridCard } from "./EpisodeGridCard";
import { EpisodeListRow } from "./EpisodeListRow";

interface SeasonTrackerProps {
  tvId: number;
  seasons: SeasonSummary[];
  media: MediaSummary;
}

type ViewMode = "list" | "grid";

export function SeasonTracker({ tvId, seasons, media }: SeasonTrackerProps) {
  const [selectedSeason, setSelectedSeason] = useState<number | null>(seasons[0]?.seasonNumber ?? null);
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  useEffect(() => {
    setSelectedSeason(seasons[0]?.seasonNumber ?? null);
  }, [tvId, seasons]);

  const {
    data: seasonDetails,
    isLoading,
    isError,
  } = useSeasonDetails(tvId, selectedSeason ?? 0, selectedSeason !== null);
  const { watchedEpisodes, toggleEpisode, markAllWatched } = useEpisodeProgress(
    tvId,
    selectedSeason ?? 0,
  );

  if (seasons.length === 0) return null;

  const episodes = seasonDetails?.episodes ?? [];
  const episodeNumbers = episodes.map((ep) => ep.episode_number);
  const nextIndex = episodes.findIndex((ep) => !watchedEpisodes.includes(ep.episode_number));

  function handleMarkSeasonWatched() {
    const key = watchlistKey(media.mediaType, media.id);
    const entry = useWatchlistStore.getState().entries[key];
    if (!entry) {
      useWatchlistStore.getState().addToWatchlist({
        tmdbId: media.id,
        mediaType: media.mediaType,
        title: media.title,
        posterPath: media.posterPath,
        genreIds: media.genreIds,
        status: WatchStatus.Watching,
      });
    } else if (entry.status !== WatchStatus.Completed) {
      useWatchlistStore.getState().setStatus(media.mediaType, media.id, WatchStatus.Watching);
    }
    markAllWatched(episodeNumbers);
  }

  return (
    <div>
      <div className="mb-[22px] flex flex-wrap items-center justify-between gap-5">
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="font-heading text-[1.375rem] font-bold text-foreground">Episodes</h2>
          <div className="flex flex-wrap gap-2">
            {seasons.map((season) => (
              <Tag
                key={season.seasonNumber}
                selected={selectedSeason === season.seasonNumber}
                onClick={() => setSelectedSeason(season.seasonNumber)}
              >
                {season.name}
              </Tag>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            disabled={episodes.length === 0}
            onClick={handleMarkSeasonWatched}
          >
            Mark season watched
          </Button>
          <div className="inline-flex gap-0.5 rounded-full bg-[var(--surface-container)] p-1">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={cn(
                "inline-flex items-center gap-[7px] rounded-full border-0 px-4 py-2 font-sans text-[0.8rem] font-semibold",
                viewMode === "list"
                  ? "bg-[var(--surface-container-highest)] text-foreground shadow-[var(--aura-sm)]"
                  : "bg-transparent text-[var(--on-surface-muted)]",
              )}
            >
              <List className="size-4" /> List
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={cn(
                "inline-flex items-center gap-[7px] rounded-full border-0 px-4 py-2 font-sans text-[0.8rem] font-semibold",
                viewMode === "grid"
                  ? "bg-[var(--surface-container-highest)] text-foreground shadow-[var(--aura-sm)]"
                  : "bg-transparent text-[var(--on-surface-muted)]",
              )}
            >
              <LayoutGrid className="size-4" /> Grid
            </button>
          </div>
        </div>
      </div>

      {isLoading && <div className="py-5 text-sm text-muted-foreground">Loading episodes…</div>}
      {isError && (
        <div className="py-5 text-sm text-destructive">Couldn't load episodes for this season.</div>
      )}

      {!isLoading && !isError && viewMode === "list" && (
        <div className="flex flex-col gap-4">
          {episodes.map((episode, index) => (
            <EpisodeListRow
              key={episode.id}
              episode={episode}
              isWatched={watchedEpisodes.includes(episode.episode_number)}
              isNext={index === nextIndex}
              onToggle={() => toggleEpisode(episode.episode_number, episodeNumbers)}
            />
          ))}
        </div>
      )}

      {!isLoading && !isError && viewMode === "grid" && (
        <div className="grid grid-cols-2 gap-[var(--card-gap)] max-sm:grid-cols-1">
          {episodes.map((episode, index) => (
            <EpisodeGridCard
              key={episode.id}
              episode={episode}
              isWatched={watchedEpisodes.includes(episode.episode_number)}
              isNext={index === nextIndex}
              onToggle={() => toggleEpisode(episode.episode_number, episodeNumbers)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
