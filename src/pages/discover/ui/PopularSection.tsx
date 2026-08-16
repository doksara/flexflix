import { MediaGrid } from "@/entities/media";
import { usePopularMovies, usePopularTvShows } from "@/features/browse-media";

export function PopularSection() {
  const popularMoviesQuery = usePopularMovies();
  const popularTvQuery = usePopularTvShows();

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-heading font-semibold">Popular movies</h2>
        <MediaGrid
          media={popularMoviesQuery.data}
          isLoading={popularMoviesQuery.isLoading}
        />
      </section>
      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-heading font-semibold">Popular TV shows</h2>
        <MediaGrid
          media={popularTvQuery.data}
          isLoading={popularTvQuery.isLoading}
        />
      </section>
    </div>
  );
}
