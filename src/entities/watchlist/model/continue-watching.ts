export interface NextEpisode {
  seasonNumber: number;
  episodeNumber: number;
}

export function computeWatchedTotal(watchedEpisodes: Record<number, number[]>): number {
  return Object.values(watchedEpisodes).reduce((sum, episodes) => sum + episodes.length, 0);
}

/**
 * Assumes episode numbers run contiguously 1..episodeCount per season, which holds for
 * effectively all real TMDB data. Computing this exactly would mean fetching every season's
 * full episode list for every tracked show just to render a watchlist row — SeasonTracker
 * does that per-season lookup because the user is already looking at that season's episodes.
 */
export function computeNextEpisode(
  seasons: { seasonNumber: number; episodeCount: number }[],
  watchedEpisodes: Record<number, number[]>,
): NextEpisode | null {
  for (const season of seasons) {
    const watched = new Set(watchedEpisodes[season.seasonNumber] ?? []);
    for (let episodeNumber = 1; episodeNumber <= season.episodeCount; episodeNumber++) {
      if (!watched.has(episodeNumber)) {
        return { seasonNumber: season.seasonNumber, episodeNumber };
      }
    }
  }
  return null;
}
