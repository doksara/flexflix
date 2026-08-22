import { PosterImage } from "@/entities/media";
import { RatingInput, StatusSelect, WatchlistButton } from "@/features/add-to-watchlist";
import { WatchLaterButton } from "@/features/add-to-watch-later";
import { DetailBackLink, DetailHero, DetailInfoCard, DetailPageError, DetailPageLoading } from "@/widgets/media-detail";

import { useShowDetail } from "../model/show-detail";

interface ShowDetailPageProps {
  id: number;
}

export function ShowDetailPage({ id }: ShowDetailPageProps) {
  const { vm, isLoading, isError } = useShowDetail(id);

  if (isLoading) {
    return <DetailPageLoading />;
  }

  if (isError || !vm) {
    return <DetailPageError />;
  }

  const metaItems = [
    vm.year,
    vm.seasonsLabel,
    vm.rating ? `★ ${vm.rating}` : null,
    vm.genresLabel,
  ].filter((item): item is string => Boolean(item));

  return (
    <div className="flex flex-col gap-8 pb-8">
      <DetailBackLink />

      <DetailHero
        media={vm.media}
        backdropSrc={vm.backdropSrc}
        typeLabel="TV Series"
        metaItems={metaItems}
        overview={vm.overview}
        actions={
          <>
            <WatchlistButton media={vm.media} />
            <StatusSelect mediaType={vm.media.mediaType} tmdbId={vm.media.id} />
            <RatingInput mediaType={vm.media.mediaType} tmdbId={vm.media.id} />
            <WatchLaterButton media={vm.media} />
          </>
        }
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
        {vm.seasons.length > 0 && (
          <div>
            <h2 className="mb-4 font-heading text-[1.375rem] font-bold text-foreground">Seasons</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {vm.seasons.map((season) => (
                <div key={season.seasonNumber} className="flex flex-col gap-2">
                  <div className="relative aspect-2/3 overflow-hidden rounded-xl bg-[var(--surface-variant)]">
                    <PosterImage posterPath={season.posterPath} title={season.name} fill />
                  </div>
                  <span className="font-heading text-sm font-bold text-foreground">{season.name}</span>
                  <span className="text-[0.75rem] text-[var(--on-surface-variant)]">
                    {season.episodeCount} episode{season.episodeCount === 1 ? "" : "s"}
                    {season.airYear ? ` · ${season.airYear}` : ""}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <DetailInfoCard
          className="h-fit"
          rows={[
            { label: "Rating", value: vm.rating ?? "—" },
            { label: "Status", value: vm.statusLabel ?? "—" },
            { label: "First aired", value: vm.firstAiredLabel ?? "—" },
          ]}
        />
      </div>
    </div>
  );
}
