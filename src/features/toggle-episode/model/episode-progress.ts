import { useWatchlistStore } from "@/entities/watchlist";

const EMPTY_EPISODES: number[] = [];

export function useEpisodeProgress(tmdbId: number, seasonNumber: number) {
  const watchedEpisodes = useWatchlistStore(
    (state) => state.tvProgress[tmdbId]?.watchedEpisodes[seasonNumber] ?? EMPTY_EPISODES,
  );
  const toggleEpisodeWatched = useWatchlistStore((state) => state.toggleEpisodeWatched);
  const markSeasonCompleted = useWatchlistStore((state) => state.markSeasonCompleted);

  function toggleEpisode(episodeNumber: number, totalEpisodesInSeason: number) {
    const wasWatched = watchedEpisodes.includes(episodeNumber);
    toggleEpisodeWatched(tmdbId, seasonNumber, episodeNumber);
    const nextWatchedCount = wasWatched ? watchedEpisodes.length - 1 : watchedEpisodes.length + 1;
    if (!wasWatched && nextWatchedCount === totalEpisodesInSeason) {
      markSeasonCompleted(tmdbId, seasonNumber);
    }
  }

  return { watchedEpisodes, toggleEpisode };
}
