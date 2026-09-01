import { RatingInput, StatusSelect, WatchlistButton } from "@/features/add-to-watchlist";
import { WatchLaterButton } from "@/features/add-to-watch-later";
import { useDocumentTitle } from "@/shared/lib/use-document-title";
import { DetailBackLink, DetailHero, DetailInfoCard, DetailPageError, DetailPageLoading } from "@/widgets/media-detail";

import { useMovieDetail } from "../model/movie-detail";

interface MovieDetailPageProps {
  id: number;
}

export function MovieDetailPage({ id }: MovieDetailPageProps) {
  const { vm, isLoading, isError, refetch } = useMovieDetail(id);

  useDocumentTitle(vm ? `${vm.media.title} — Flexflix` : "Flexflix");

  if (isLoading) {
    return <DetailPageLoading />;
  }

  if (isError || !vm) {
    return <DetailPageError onRetry={refetch} />;
  }

  const metaItems = [
    vm.year,
    vm.runtimeLabel,
    vm.rating ? `★ ${vm.rating}` : null,
    vm.genresLabel,
  ].filter((item): item is string => Boolean(item));

  return (
    <div className="flex flex-col gap-8 pb-8">
      <DetailBackLink />

      <DetailHero
        media={vm.media}
        backdropSrc={vm.backdropSrc}
        typeLabel="Movie"
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

      <DetailInfoCard
        rows={[
          { label: "Rating", value: vm.rating ?? "—" },
          { label: "Status", value: vm.statusLabel ?? "—" },
          { label: "Released", value: vm.releaseDateLabel ?? "—" },
        ]}
      />
    </div>
  );
}
