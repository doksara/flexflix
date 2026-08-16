import type {
  TmdbMovieListItem,
  TmdbMultiSearchItem,
  TmdbTvListItem,
} from "@/shared/api";

import type { MediaSummary } from "./media";
import { MediaType } from "./media";

export function movieToSummary(movie: TmdbMovieListItem): MediaSummary {
  return {
    id: movie.id,
    mediaType: MediaType.Movie,
    title: movie.title,
    posterPath: movie.poster_path,
    releaseDate: movie.release_date || null,
    voteAverage: movie.vote_average,
    genreIds: movie.genre_ids,
  };
}

export function tvToSummary(tv: TmdbTvListItem): MediaSummary {
  return {
    id: tv.id,
    mediaType: MediaType.TvShow,
    title: tv.name,
    posterPath: tv.poster_path,
    releaseDate: tv.first_air_date || null,
    voteAverage: tv.vote_average,
    genreIds: tv.genre_ids,
  };
}

export function multiSearchToSummary(
  item: TmdbMultiSearchItem,
): MediaSummary | null {
  if (item.media_type === "movie") return movieToSummary(item);
  if (item.media_type === "tv") return tvToSummary(item);
  return null;
}
