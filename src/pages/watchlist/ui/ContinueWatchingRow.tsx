import { Link } from "@tanstack/react-router";
import { Check, Play, RotateCcw } from "lucide-react";

import { MediaListItem } from "@/entities/media";
import type { WatchlistEntry } from "@/entities/watchlist";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { ProgressBar } from "@/shared/ui/progress-bar";
import { Skeleton } from "@/shared/ui/skeleton";

import { useContinueWatchingItem } from "../model/continue-watching-item";

interface ContinueWatchingRowProps {
  entry: WatchlistEntry;
}

export function ContinueWatchingRow({ entry }: ContinueWatchingRowProps) {
  const { vm, isLoading } = useContinueWatchingItem(entry);

  if (isLoading || !vm) {
    return <Skeleton className="h-[104px] w-full rounded-2xl" />;
  }

  return (
    <MediaListItem
      media={vm.media}
      imageSrc={vm.backdropSrc}
      badge={
        vm.isDone ? (
          <Badge variant="success">
            <Check data-icon="inline-start" />
            Completed
          </Badge>
        ) : (
          <Badge variant="secondary">Watching now</Badge>
        )
      }
      subtitle={
        <>
          <span className="text-[0.8125rem] text-[var(--on-surface-variant)]">
            {vm.isDone
              ? `All ${vm.totalEpisodes} episodes watched`
              : `${vm.watchedTotal}/${vm.totalEpisodes} episodes · Next: ${vm.nextEpisodeLabel}`}
          </span>
          <div className="mt-1 max-w-[420px]">
            <ProgressBar value={vm.pct} variant="secondary" />
          </div>
        </>
      }
      trailing={
        <>
          <span className="font-heading text-[1.4rem] font-extrabold text-secondary">{vm.pct}%</span>
          <Button variant={vm.isDone ? "secondary" : "default"} size="sm" asChild>
            <Link to="/tv/$id" params={{ id: String(entry.tmdbId) }}>
              {vm.isDone ? <RotateCcw /> : <Play />}
              {vm.isDone ? "Rewatch" : "Resume"}
            </Link>
          </Button>
        </>
      }
    />
  );
}
