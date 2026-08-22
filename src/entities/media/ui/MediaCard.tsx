import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";

import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/lib/tailwind";

import type { MediaSummary } from "../model/media";
import { MediaType } from "../model/media";
import { PosterImage } from "./PosterImage";

interface MediaCardProps {
  media: MediaSummary;
  className?: string;
}

export function MediaCard({ media, className }: MediaCardProps) {
  const year = media.releaseDate ? media.releaseDate.slice(0, 4) : null;
  const to = media.mediaType === MediaType.Movie ? "/movie/$id" : "/tv/$id";

  return (
    <Link
      to={to}
      params={{ id: String(media.id) }}
      className={cn(
        "fx-card relative block w-full overflow-hidden rounded-xl bg-[var(--surface-container-highest)] text-foreground hover:z-10",
        className,
      )}
    >
      <div className="relative aspect-2/3 w-full bg-[var(--surface-variant)]">
        <PosterImage
          posterPath={media.posterPath}
          title={media.title}
          fill
          className="fx-card-img"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "var(--scrim-bottom)" }}
        />
        {media.voteAverage > 0 && (
          <Badge className="absolute top-2.5 left-2.5" variant="secondary">
            <Star className="fill-current" />
            {media.voteAverage.toFixed(1)}
          </Badge>
        )}
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4 pb-[1.05rem]">
          <span className="line-clamp-1 font-heading text-[1.25rem] leading-[1.15] font-bold tracking-[-0.004em] text-white">
            {media.title}
          </span>
          {year && (
            <span className="text-[0.8125rem] text-[var(--on-surface-variant)]">{year}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
