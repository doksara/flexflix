import { ImageOff } from "lucide-react";

import { posterUrl } from "@/shared/lib/image";
import { cn } from "@/shared/lib/tailwind";

interface PosterImageProps {
  posterPath: string | null;
  title: string;
  className?: string;
  /** Fill the parent's box instead of sizing its own aspect ratio (for compositing under a scrim/overlay). */
  fill?: boolean;
}

export function PosterImage({ posterPath, title, className, fill = false }: PosterImageProps) {
  const src = posterUrl(posterPath);

  if (!src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted text-muted-foreground",
          fill ? "absolute inset-0" : "aspect-2/3 w-full rounded-lg",
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
      className={cn(
        "object-cover",
        fill ? "absolute inset-0 h-full w-full" : "aspect-2/3 w-full rounded-lg",
        className,
      )}
    />
  );
}
