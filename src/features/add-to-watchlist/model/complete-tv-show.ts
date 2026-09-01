import { isTrackableSeason } from "@/entities/media";
import { useWatchlistStore } from "@/entities/watchlist";
import { getSeasonDetails, getTvDetails } from "@/shared/api";

export async function markAllEpisodesWatchedForShow(tmdbId: number): Promise<void> {
  const show = await getTvDetails(tmdbId);
  const seasonEpisodes = await Promise.all(
    show.seasons.filter(isTrackableSeason).map(async (season) => ({
      seasonNumber: season.season_number,
      episodeNumbers: (await getSeasonDetails(tmdbId, season.season_number)).episodes.map(
        (episode) => episode.episode_number,
      ),
    })),
  );
  useWatchlistStore.getState().markShowCompleted(tmdbId, seasonEpisodes);
}
