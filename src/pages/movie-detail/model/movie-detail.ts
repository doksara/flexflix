import { MediaType, useMovieDetails } from "@/entities/media";
import type { MediaSummary } from "@/entities/media";
import { formatDate } from "@/shared/lib/date";
import { backdropUrl } from "@/shared/lib/image";

export interface MovieDetailViewModel {
  media: MediaSummary;
  backdropSrc: string | null;
  year: string | null;
  runtimeLabel: string | null;
  rating: string | null;
  genresLabel: string | null;
  overview: string;
  tagline: string | null;
  statusLabel: string | null;
  releaseDateLabel: string | null;
}

function formatRuntime(minutes: number | null): string | null {
  if (!minutes) return null;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

export function useMovieDetail(id: number) {
  const query = useMovieDetails(id);
  const movie = query.data;

  let vm: MovieDetailViewModel | undefined;
  if (movie) {
    vm = {
      media: {
        id: movie.id,
        mediaType: MediaType.Movie,
        title: movie.title,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date || null,
        voteAverage: movie.vote_average,
        genreIds: movie.genres.map((genre) => genre.id),
      },
      backdropSrc: backdropUrl(movie.backdrop_path),
      year: movie.release_date ? movie.release_date.slice(0, 4) : null,
      runtimeLabel: formatRuntime(movie.runtime),
      rating: movie.vote_average > 0 ? movie.vote_average.toFixed(1) : null,
      genresLabel: movie.genres.map((genre) => genre.name).join(", ") || null,
      overview: movie.overview,
      tagline: movie.tagline,
      statusLabel: movie.status || null,
      releaseDateLabel: formatDate(movie.release_date),
    };
  }

  return { vm, isLoading: query.isLoading, isError: query.isError, refetch: query.refetch };
}
