import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";

import { Badge } from "@/shared/ui/badge";

import type { MediaSummary } from "../model/media";
import { MediaType } from "../model/media";
import { PosterImage } from "./PosterImage";

interface MediaCardProps {
  media: MediaSummary;
}

export function MediaCard({ media }: MediaCardProps) {
  const year = media.releaseDate ? media.releaseDate.slice(0, 4) : null;
  const to = media.mediaType === MediaType.Movie ? "/movie/$id" : "/tv/$id";

  return (
    <Link
      to={to}
      params={{ id: String(media.id) }}
      className="group flex flex-col gap-2"
    >
      <div className="relative">
        <PosterImage posterPath={media.posterPath} title={media.title} />
        {media.voteAverage > 0 && (
          <Badge className="absolute top-2 right-2 gap-1" variant="secondary">
            <Star className="size-3 fill-current" />
            {media.voteAverage.toFixed(1)}
          </Badge>
        )}
      </div>
      <div className="flex flex-col">
        <span className="line-clamp-1 text-sm font-medium group-hover:underline">
          {media.title}
        </span>
        {year && <span className="text-xs text-muted-foreground">{year}</span>}
      </div>
    </Link>
  );
}
