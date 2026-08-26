import type { TmdbTvSeasonSummary } from "@/shared/api";

export interface SeasonSummary {
  seasonNumber: number;
  name: string;
  episodeCount: number;
  airYear: string | null;
  posterPath: string | null;
}

/** Excludes the "Specials" season (0) and seasons TMDB hasn't populated episodes for yet. */
export function isTrackableSeason(season: TmdbTvSeasonSummary): boolean {
  return season.season_number !== 0 && season.episode_count > 0;
}
