import type { MediaSummary } from "../model/media";
import { MediaCard } from "./MediaCard";
import { MediaCardSkeleton } from "./MediaCardSkeleton";

interface MediaRowProps {
  title: string;
  eyebrow?: string;
  media?: MediaSummary[];
  isLoading?: boolean;
  skeletonCount?: number;
}

export function MediaRow({ title, eyebrow, media, isLoading, skeletonCount = 8 }: MediaRowProps) {
  if (!isLoading && (!media || media.length === 0)) {
    return null;
  }

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-[3px]">
        {eyebrow && (
          <span className="text-[0.75rem] font-semibold tracking-[0.05em] text-[var(--on-surface-muted)] uppercase">
            {eyebrow}
          </span>
        )}
        <h2 className="font-heading text-[1.375rem] leading-[1.25] font-semibold tracking-[-0.006em] text-foreground">
          {title}
        </h2>
      </div>
      <div className="fx-scroll flex gap-[var(--card-gap)] overflow-x-auto pt-1.5 pb-4">
        {isLoading
          ? Array.from({ length: skeletonCount }).map((_, index) => (
              <MediaCardSkeleton key={index} className="w-[196px] shrink-0" />
            ))
          : media?.map((item) => (
              <MediaCard
                key={`${item.mediaType}:${item.id}`}
                media={item}
                className="w-[196px] shrink-0"
              />
            ))}
      </div>
    </section>
  );
}
