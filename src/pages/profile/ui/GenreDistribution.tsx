import { ProgressBar } from "@/shared/ui/progress-bar";

import type { GenreDistributionItem } from "../model/profile-stats";

interface GenreDistributionProps {
  genres: GenreDistributionItem[];
}

export function GenreDistribution({ genres }: GenreDistributionProps) {
  if (genres.length === 0) return null;

  return (
    <div>
      <h3 className="mb-4 font-heading text-[1.25rem] font-bold text-foreground">Genre breakdown</h3>
      <div className="flex max-w-[520px] flex-col gap-3.5">
        {genres.map((genre) => (
          <ProgressBar
            key={genre.name}
            value={genre.pct}
            variant="primary"
            label={genre.name}
            trailing={`${genre.count}`}
          />
        ))}
      </div>
    </div>
  );
}
