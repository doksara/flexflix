import { MediaGrid } from "@/entities/media";
import { useTrending } from "@/features/browse-media";

export function TrendingSection() {
  const trendingQuery = useTrending();

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-heading font-semibold">Trending this week</h2>
      <MediaGrid media={trendingQuery.data} isLoading={trendingQuery.isLoading} />
    </section>
  );
}
