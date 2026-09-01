import { Clapperboard, ListVideo, LibraryBig } from "lucide-react";
import { useState } from "react";

import { useDocumentTitle } from "@/shared/lib/use-document-title";
import { Tabs } from "@/shared/ui/tabs";

import {
  useContinueWatchingEntries,
  useTotalEpisodesWatched,
  useWatchLaterEntries,
  useWatchlistEntries,
} from "../model/watchlist-page";
import { AllTab } from "./AllTab";
import { ContinueWatchingTab } from "./ContinueWatchingTab";
import { StatsBar } from "./StatsBar";
import { WatchLaterTab } from "./WatchLaterTab";

const TABS = [
  { id: "continue-watching", label: "Continue Watching", icon: Clapperboard },
  { id: "watch-later", label: "Watch Later", icon: ListVideo },
  { id: "all", label: "All", icon: LibraryBig },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function WatchlistPage() {
  useDocumentTitle("My Watchlist — Flexflix");
  const [tab, setTab] = useState<TabId>("continue-watching");
  const entries = useWatchlistEntries();
  const watchLaterEntries = useWatchLaterEntries();
  const continueWatchingEntries = useContinueWatchingEntries();
  const episodesWatched = useTotalEpisodesWatched();

  return (
    <div className="flex flex-col gap-8 pb-8">
      <div>
        <span className="text-[0.75rem] font-semibold tracking-[0.05em] text-[var(--on-surface-muted)] uppercase">
          Your collection
        </span>
        <h1 className="mt-1 font-heading text-[2.75rem] leading-[1.1] font-bold tracking-[-0.018em] text-foreground">
          My Watchlist
        </h1>
      </div>

      <StatsBar
        totalTitles={entries.length}
        watchLaterCount={watchLaterEntries.length}
        episodesWatched={episodesWatched}
      />

      <div>
        <Tabs
          items={TABS.map((item) => ({
            ...item,
            count:
              item.id === "continue-watching"
                ? continueWatchingEntries.length
                : item.id === "watch-later"
                  ? watchLaterEntries.length
                  : entries.length,
          }))}
          value={tab}
          onChange={(id) => setTab(id as TabId)}
          className="mb-6 border-b border-[var(--ghost-border)]"
        />

        {tab === "continue-watching" && <ContinueWatchingTab entries={continueWatchingEntries} />}
        {tab === "watch-later" && <WatchLaterTab entries={watchLaterEntries} />}
        {tab === "all" && <AllTab entries={entries} />}
      </div>
    </div>
  );
}
