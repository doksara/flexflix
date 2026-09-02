import { MediaRow, useMoreLikeThis } from "@/entities/media";
import type { MediaType } from "@/entities/media";

interface MoreLikeThisSectionProps {
  mediaType: MediaType;
  id: number;
}

export function MoreLikeThisSection({ mediaType, id }: MoreLikeThisSectionProps) {
  const recommendationsQuery = useMoreLikeThis(mediaType, id);

  return (
    <MediaRow
      eyebrow="Keep going"
      title="More like this"
      media={recommendationsQuery.data}
      isLoading={recommendationsQuery.isLoading}
    />
  );
}
