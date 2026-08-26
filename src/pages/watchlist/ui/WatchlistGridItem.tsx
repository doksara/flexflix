import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { MediaType, PosterImage } from "@/entities/media";
import type { MediaSummary } from "@/entities/media";

interface WatchlistGridItemProps {
  media: MediaSummary;
  meta?: string;
  badge?: ReactNode;
  overlayAction?: ReactNode;
}

export function WatchlistGridItem({ media, meta, badge, overlayAction }: WatchlistGridItemProps) {
  const to = media.mediaType === MediaType.Movie ? "/movie/$id" : "/tv/$id";

  return (
    <div className="relative">
      <Link
        to={to}
        params={{ id: String(media.id) }}
        className="fx-card relative block w-full overflow-hidden rounded-xl bg-[var(--surface-container-highest)] text-foreground"
      >
        <div className="relative aspect-2/3 w-full bg-[var(--surface-variant)]">
          <PosterImage posterPath={media.posterPath} title={media.title} fill />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "var(--scrim-bottom)" }}
          />
          {badge && <div className="absolute top-2.5 left-2.5">{badge}</div>}
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4 pb-[1.05rem]">
            <span className="line-clamp-1 font-heading text-[1.25rem] leading-[1.15] font-bold tracking-[-0.004em] text-white">
              {media.title}
            </span>
            {meta && <span className="text-[0.8125rem] text-[var(--on-surface-variant)]">{meta}</span>}
          </div>
        </div>
      </Link>
      {overlayAction && <div className="absolute top-2.5 right-2.5 z-10">{overlayAction}</div>}
    </div>
  );
}
