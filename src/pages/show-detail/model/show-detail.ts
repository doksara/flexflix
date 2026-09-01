import { useMemo } from "react";

import { isTrackableSeason, MediaType, useTvDetails } from "@/entities/media";
import type { MediaSummary, SeasonSummary } from "@/entities/media";
import { useWatchlistStore } from "@/entities/watchlist";
import { formatDate } from "@/shared/lib/date";
import { backdropUrl } from "@/shared/lib/image";

export interface ShowDetailViewModel {
  media: MediaSummary;
  backdropSrc: string | null;
  year: string | null;
  seasonsLabel: string | null;
  rating: string | null;
  genresLabel: string | null;
  overview: string;
  statusLabel: string | null;
  firstAiredLabel: string | null;
  seasons: SeasonSummary[];
  showProgress: boolean;
  progressPct: number;
  progressTrailing: string;
}

export function useShowDetail(id: number) {
  const query = useTvDetails(id);
  const show = query.data;
  const watchedTotal = useWatchlistStore((state) => {
    const progress = state.tvProgress[id];
    if (!progress) return 0;
    return Object.values(progress.watchedEpisodes).reduce((sum, eps) => sum + eps.length, 0);
  });

  const seasons = useMemo<SeasonSummary[]>(
    () =>
      (show?.seasons ?? [])
        .filter(isTrackableSeason)
        .map((season) => ({
          seasonNumber: season.season_number,
          name: season.name,
          episodeCount: season.episode_count,
          airYear: season.air_date ? season.air_date.slice(0, 4) : null,
          posterPath: season.poster_path,
        })),
    [show?.seasons],
  );

  let vm: ShowDetailViewModel | undefined;
  if (show) {
    vm = {
      media: {
        id: show.id,
        mediaType: MediaType.TvShow,
        title: show.name,
        posterPath: show.poster_path,
        releaseDate: show.first_air_date || null,
        voteAverage: show.vote_average,
        genreIds: show.genres.map((genre) => genre.id),
      },
      backdropSrc: backdropUrl(show.backdrop_path),
      year: show.first_air_date ? show.first_air_date.slice(0, 4) : null,
      seasonsLabel: `${show.number_of_seasons} season${show.number_of_seasons === 1 ? "" : "s"} · ${show.number_of_episodes} episodes`,
      rating: show.vote_average > 0 ? show.vote_average.toFixed(1) : null,
      genresLabel: show.genres.map((genre) => genre.name).join(", ") || null,
      overview: show.overview,
      statusLabel: show.status || null,
      firstAiredLabel: formatDate(show.first_air_date),
      seasons,
      showProgress: watchedTotal > 0,
      progressPct: show.number_of_episodes
        ? Math.min(100, Math.round((watchedTotal / show.number_of_episodes) * 100))
        : 0,
      progressTrailing: `${watchedTotal}/${show.number_of_episodes}`,
    };
  }

  return { vm, isLoading: query.isLoading, isError: query.isError, refetch: query.refetch };
}
