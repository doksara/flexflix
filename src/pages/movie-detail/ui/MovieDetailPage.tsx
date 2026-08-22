import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

import { PosterImage } from "@/entities/media";
import { RatingInput, StatusSelect, WatchlistButton } from "@/features/add-to-watchlist";
import { WatchLaterButton } from "@/features/add-to-watch-later";
import { Skeleton } from "@/shared/ui/skeleton";

import { useMovieDetail } from "../model/movie-detail";

interface MovieDetailPageProps {
  id: number;
}

export function MovieDetailPage({ id }: MovieDetailPageProps) {
  const { vm, isLoading, isError } = useMovieDetail(id);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 pb-8">
        <Skeleton className="h-9 w-24 rounded-full" />
        <Skeleton className="aspect-video w-full rounded-3xl sm:aspect-21/9" />
      </div>
    );
  }

  if (isError || !vm) {
    return (
      <div className="py-24 text-center text-muted-foreground">
        Something went wrong loading this title.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-8">
      <Link
        to="/"
        className="inline-flex w-fit items-center gap-1.5 rounded-full py-2 pr-4 pl-3 text-sm font-semibold text-foreground backdrop-blur-[var(--glass-blur)]"
        style={{ background: "var(--glass-bar)" }}
      >
        <ChevronLeft className="size-4" />
        Browse
      </Link>

      <div className="relative overflow-hidden rounded-3xl bg-[var(--surface-container)]">
        {vm.backdropSrc && (
          <img
            src={vm.backdropSrc}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0" style={{ background: "var(--scrim-hero)" }} />
        <div className="relative grid grid-cols-[160px_1fr] gap-6 p-6 sm:grid-cols-[200px_1fr] sm:gap-8 sm:p-10 md:grid-cols-[248px_1fr]">
          <div className="relative aspect-2/3 overflow-hidden rounded-2xl bg-[var(--surface-variant)] shadow-[var(--aura-lg)]">
            <PosterImage posterPath={vm.media.posterPath} title={vm.media.title} fill />
          </div>
          <div className="flex flex-col justify-end gap-3 pb-1">
            <span className="text-[0.75rem] font-semibold tracking-[0.05em] text-secondary uppercase">
              Movie
            </span>
            <h1 className="font-heading text-[2.25rem] leading-[1.08] font-bold tracking-[-0.015em] text-white sm:text-[3rem]">
              {vm.media.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-[0.8125rem] text-[var(--on-surface-variant)]">
              {vm.year && <span>{vm.year}</span>}
              {vm.runtimeLabel && (
                <>
                  <span>·</span>
                  <span>{vm.runtimeLabel}</span>
                </>
              )}
              {vm.rating && (
                <>
                  <span>·</span>
                  <span>★ {vm.rating}</span>
                </>
              )}
              {vm.genresLabel && (
                <>
                  <span>·</span>
                  <span>{vm.genresLabel}</span>
                </>
              )}
            </div>
            {vm.overview && (
              <p className="max-w-[60ch] text-[0.9375rem] leading-relaxed text-foreground">
                {vm.overview}
              </p>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <WatchlistButton media={vm.media} />
              <StatusSelect mediaType={vm.media.mediaType} tmdbId={vm.media.id} />
              <RatingInput mediaType={vm.media.mediaType} tmdbId={vm.media.id} />
              <WatchLaterButton media={vm.media} />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[360px] rounded-2xl bg-[var(--surface-container)] p-6">
        <span className="text-[0.75rem] font-semibold tracking-[0.05em] text-[var(--on-surface-muted)] uppercase">
          Details
        </span>
        <div className="mt-3 divide-y divide-[var(--surface-variant)]">
          <div className="flex items-center justify-between py-3">
            <span className="text-[0.8125rem] font-semibold tracking-[0.05em] text-[var(--on-surface-muted)] uppercase">
              Rating
            </span>
            <span className="text-sm font-medium text-foreground">{vm.rating ?? "—"}</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-[0.8125rem] font-semibold tracking-[0.05em] text-[var(--on-surface-muted)] uppercase">
              Status
            </span>
            <span className="text-sm font-medium text-foreground">{vm.statusLabel ?? "—"}</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-[0.8125rem] font-semibold tracking-[0.05em] text-[var(--on-surface-muted)] uppercase">
              Released
            </span>
            <span className="text-sm font-medium text-foreground">
              {vm.releaseDateLabel ?? "—"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
