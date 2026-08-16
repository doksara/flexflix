import { ImageOff } from "lucide-react";

import { posterUrl } from "@/shared/lib/image";
import { cn } from "@/shared/lib/tailwind";

interface PosterImageProps {
  posterPath: string | null;
  title: string;
  className?: string;
}

export function PosterImage({ posterPath, title, className }: PosterImageProps) {
  const src = posterUrl(posterPath);

  if (!src) {
    return (
      <div
        className={cn(
          "flex aspect-2/3 w-full items-center justify-center rounded-lg bg-muted text-muted-foreground",
          className,
        )}
      >
        <ImageOff className="size-8" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={title}
      loading="lazy"
      className={cn("aspect-2/3 w-full rounded-lg object-cover", className)}
    />
  );
}
