import { useWatchlistStore } from "@/entities/watchlist";

const EMPTY_EPISODES: number[] = [];

export function useEpisodeProgress(tmdbId: number, seasonNumber: number) {
  const watchedEpisodes = useWatchlistStore(
    (state) => state.tvProgress[tmdbId]?.watchedEpisodes[seasonNumber] ?? EMPTY_EPISODES,
  );

  function toggleEpisode(episodeNumber: number, totalEpisodesInSeason: number) {
    useWatchlistStore.getState().toggleEpisodeWatched(tmdbId, seasonNumber, episodeNumber);

    const nextWatchedEpisodes =
      useWatchlistStore.getState().tvProgress[tmdbId]?.watchedEpisodes[seasonNumber] ??
      EMPTY_EPISODES;

    if (nextWatchedEpisodes.length === totalEpisodesInSeason) {
      useWatchlistStore.getState().markSeasonCompleted(tmdbId, seasonNumber);
    } else {
      useWatchlistStore.getState().unmarkSeasonCompleted(tmdbId, seasonNumber);
    }
  }

  function markAllWatched(episodeNumbers: number[]) {
    useWatchlistStore.getState().markAllEpisodesWatched(tmdbId, seasonNumber, episodeNumbers);
  }

  return { watchedEpisodes, toggleEpisode, markAllWatched };
}
