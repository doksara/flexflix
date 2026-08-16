import type { MediaSummary } from "../model/media";
import { MediaCard } from "./MediaCard";
import { MediaCardSkeleton } from "./MediaCardSkeleton";

interface MediaGridProps {
  media?: MediaSummary[];
  isLoading?: boolean;
  skeletonCount?: number;
}

export function MediaGrid({ media, isLoading, skeletonCount = 12 }: MediaGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <MediaCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!media || media.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">Nothing to show here yet.</p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {media.map((item) => (
        <MediaCard key={`${item.mediaType}:${item.id}`} media={item} />
      ))}
    </div>
  );
}
