export interface TmdbPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TmdbGenre {
  id: number;
  name: string;
}

export interface TmdbMovieListItem {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  genre_ids: number[];
  vote_average: number;
  overview: string;
}

export interface TmdbTvListItem {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  genre_ids: number[];
  vote_average: number;
  overview: string;
}

export type TmdbMultiSearchItem =
  | (TmdbMovieListItem & { media_type: "movie" })
  | (TmdbTvListItem & { media_type: "tv" })
  | { id: number; media_type: "person" };

export interface TmdbMovieDetails extends Omit<TmdbMovieListItem, "genre_ids"> {
  genres: TmdbGenre[];
  runtime: number | null;
  tagline: string | null;
  status: string;
}

export interface TmdbTvSeasonSummary {
  id: number;
  season_number: number;
  name: string;
  episode_count: number;
  poster_path: string | null;
  air_date: string | null;
}

export interface TmdbTvDetails extends Omit<TmdbTvListItem, "genre_ids"> {
  genres: TmdbGenre[];
  seasons: TmdbTvSeasonSummary[];
  number_of_episodes: number;
  number_of_seasons: number;
  status: string;
}

export interface TmdbEpisode {
  id: number;
  episode_number: number;
  season_number: number;
  name: string;
  overview: string;
  air_date: string | null;
  still_path: string | null;
}

export interface TmdbSeasonDetails {
  id: number;
  season_number: number;
  name: string;
  episodes: TmdbEpisode[];
}
