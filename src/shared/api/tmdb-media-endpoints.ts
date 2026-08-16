import { tmdbFetch } from "./tmdb-client";
import type {
  TmdbGenre,
  TmdbMovieDetails,
  TmdbMultiSearchItem,
  TmdbMovieListItem,
  TmdbPaginatedResponse,
  TmdbSeasonDetails,
  TmdbTvDetails,
  TmdbTvListItem,
} from "./tmdb-media";

export function searchMulti(query: string, page = 1) {
  return tmdbFetch<TmdbPaginatedResponse<TmdbMultiSearchItem>>(
    "/search/multi",
    { params: { query, page } },
  );
}

export function getMovieDetails(id: number) {
  return tmdbFetch<TmdbMovieDetails>(`/movie/${id}`);
}

export function getTvDetails(id: number) {
  return tmdbFetch<TmdbTvDetails>(`/tv/${id}`);
}

export function getSeasonDetails(tvId: number, seasonNumber: number) {
  return tmdbFetch<TmdbSeasonDetails>(`/tv/${tvId}/season/${seasonNumber}`);
}

export function getTrendingAllWeek(page = 1) {
  return tmdbFetch<TmdbPaginatedResponse<TmdbMultiSearchItem>>(
    "/trending/all/week",
    { params: { page } },
  );
}

export function discoverMovies(params: { genreId?: number; page?: number } = {}) {
  return tmdbFetch<TmdbPaginatedResponse<TmdbMovieListItem>>("/discover/movie", {
    params: { with_genres: params.genreId, page: params.page ?? 1 },
  });
}

export function discoverTvShows(params: { genreId?: number; page?: number } = {}) {
  return tmdbFetch<TmdbPaginatedResponse<TmdbTvListItem>>("/discover/tv", {
    params: { with_genres: params.genreId, page: params.page ?? 1 },
  });
}

export function getPopularMovies(page = 1) {
  return tmdbFetch<TmdbPaginatedResponse<TmdbMovieListItem>>("/movie/popular", {
    params: { page },
  });
}

export function getPopularTvShows(page = 1) {
  return tmdbFetch<TmdbPaginatedResponse<TmdbTvListItem>>("/tv/popular", {
    params: { page },
  });
}

export function getMovieGenres() {
  return tmdbFetch<{ genres: TmdbGenre[] }>("/genre/movie/list");
}

export function getTvGenres() {
  return tmdbFetch<{ genres: TmdbGenre[] }>("/genre/tv/list");
}

export function getMovieRecommendations(id: number, page = 1) {
  return tmdbFetch<TmdbPaginatedResponse<TmdbMovieListItem>>(
    `/movie/${id}/recommendations`,
    { params: { page } },
  );
}

export function getTvRecommendations(id: number, page = 1) {
  return tmdbFetch<TmdbPaginatedResponse<TmdbTvListItem>>(
    `/tv/${id}/recommendations`,
    { params: { page } },
  );
}
