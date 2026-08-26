export interface NextEpisode {
  seasonNumber: number;
  episodeNumber: number;
}

export function computeWatchedTotal(watchedEpisodes: Record<number, number[]>): number {
  return Object.values(watchedEpisodes).reduce((sum, episodes) => sum + episodes.length, 0);
}

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
