import type { WatchlistEntry } from "@/entities/watchlist";

import { ContinueWatchingRow } from "./ContinueWatchingRow";
import { EmptyState } from "./EmptyState";

interface ContinueWatchingTabProps {
  entries: WatchlistEntry[];
}

export function ContinueWatchingTab({ entries }: ContinueWatchingTabProps) {
  if (entries.length === 0) {
    return (
      <EmptyState
        title="Nothing in progress."
        subtitle="Set a show to Watching and it'll show up here with your next episode."
      />
    );
  }

  return (
    <div className="flex flex-col gap-[18px]">
      {entries.map((entry) => (
        <ContinueWatchingRow key={entry.tmdbId} entry={entry} />
      ))}
    </div>
  );
}
