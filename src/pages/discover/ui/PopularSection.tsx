import { MediaRow } from "@/entities/media";
import { usePopularMovies, usePopularTvShows } from "@/features/browse-media";

export function PopularSection() {
  const popularMoviesQuery = usePopularMovies();
  const popularTvQuery = usePopularTvShows();

  return (
    <div className="flex flex-col gap-6">
      <MediaRow
        title="Popular movies"
        media={popularMoviesQuery.data}
        isLoading={popularMoviesQuery.isLoading}
      />
      <MediaRow
        title="Popular TV shows"
        media={popularTvQuery.data}
        isLoading={popularTvQuery.isLoading}
      />
    </div>
  );
}
