import { RatingInput, StatusSelect, WatchlistButton } from "@/features/add-to-watchlist";
import { WatchLaterButton } from "@/features/add-to-watch-later";
import { useDocumentTitle } from "@/shared/lib/use-document-title";
import { ProgressBar } from "@/shared/ui/progress-bar";
import { DetailBackLink, DetailHero, DetailInfoCard, DetailPageError, DetailPageLoading } from "@/widgets/media-detail";
import { SeasonTracker } from "@/widgets/season-tracker";

import { useShowDetail } from "../model/show-detail";

interface ShowDetailPageProps {
  id: number;
}

export function ShowDetailPage({ id }: ShowDetailPageProps) {
  const { vm, isLoading, isError, refetch } = useShowDetail(id);

  useDocumentTitle(vm ? `${vm.media.title} — Flexflix` : "Flexflix");

  if (isLoading) {
    return <DetailPageLoading />;
  }

  if (isError || !vm) {
    return <DetailPageError onRetry={refetch} />;
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
        progress={
          vm.showProgress && (
            <ProgressBar
              value={vm.progressPct}
              variant="secondary"
              dot
              label="Overall progress"
              trailing={vm.progressTrailing}
            />
          )
        }
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
        <SeasonTracker tvId={vm.media.id} seasons={vm.seasons} />

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
