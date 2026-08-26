import { useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { cn } from "@/shared/lib/tailwind";

import type { MediaSummary } from "../model/media";
import { MediaType } from "../model/media";

interface MediaListItemProps {
  media: MediaSummary;
  imageSrc: string | null;
  subtitle?: ReactNode;
  badge?: ReactNode;
  trailing?: ReactNode;
  className?: string;
}

export function MediaListItem({
  media,
  imageSrc,
  subtitle,
  badge,
  trailing,
  className,
}: MediaListItemProps) {
  const navigate = useNavigate();
  const to = media.mediaType === MediaType.Movie ? "/movie/$id" : "/tv/$id";
  const open = () => navigate({ to, params: { id: String(media.id) } });

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={open}
      onKeyDown={(event) => {
        if (event.key === "Enter") open();
      }}
      className={cn(
        "grid cursor-pointer grid-cols-[200px_1fr_auto] items-center gap-6 rounded-2xl bg-[var(--surface-container)] p-4 text-foreground max-sm:grid-cols-[96px_1fr]",
        className,
      )}
    >
      <div className="relative aspect-video overflow-hidden rounded-lg bg-[var(--surface-variant)]">
        {imageSrc && <img src={imageSrc} alt="" className="h-full w-full object-cover" />}
      </div>
      <div className="flex min-w-0 flex-col gap-2.5">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="truncate font-heading text-[1.25rem] font-bold text-foreground">
            {media.title}
          </h3>
          {badge}
        </div>
        {subtitle}
      </div>
      {trailing && (
        <div
          className="flex flex-col items-end gap-3 pr-2 max-sm:hidden"
          onClick={(event) => event.stopPropagation()}
        >
          {trailing}
        </div>
      )}
    </div>
  );
}
