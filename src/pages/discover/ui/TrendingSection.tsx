import { MediaRow } from "@/entities/media";
import { useTrending } from "@/features/browse-media";

export function TrendingSection() {
  const trendingQuery = useTrending();

  return (
    <MediaRow
      eyebrow="Right now"
      title="Trending this week"
      media={trendingQuery.data}
      isLoading={trendingQuery.isLoading}
    />
  );
}
