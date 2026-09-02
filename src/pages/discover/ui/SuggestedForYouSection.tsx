import { MediaRow } from "@/entities/media";
import { useSuggestedForYou } from "@/features/browse-media";

export function SuggestedForYouSection() {
  const suggestedQuery = useSuggestedForYou();

  return (
    <MediaRow
      eyebrow="Based on what you've watched"
      title="Suggested for you"
      media={suggestedQuery.data}
      isLoading={suggestedQuery.isLoading}
    />
  );
}
