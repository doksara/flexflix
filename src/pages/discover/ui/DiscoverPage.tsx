import { useDocumentTitle } from "@/shared/lib/use-document-title";

import { useDiscoverSearch } from "../model/discover";
import { PopularSection } from "./PopularSection";
import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults";
import { SuggestedForYouSection } from "./SuggestedForYouSection";
import { TrendingSection } from "./TrendingSection";

interface DiscoverPageProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export function DiscoverPage({ query, onQueryChange }: DiscoverPageProps) {
  useDocumentTitle("Discover — Flexflix");
  const { searchQuery } = useDiscoverSearch(query);
  const isSearching = query.trim().length > 0;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6 pt-4 sm:pt-8">
        <div>
          <span className="text-[0.75rem] font-semibold tracking-[0.05em] text-[var(--on-surface-muted)] uppercase">
            Discovery, reimagined
          </span>
          <h1 className="mt-1.5 font-heading text-[2.75rem] leading-[1.1] font-bold tracking-[-0.018em] text-foreground sm:text-[3.5rem] sm:leading-[1.06] sm:font-extrabold sm:tracking-[-0.02em]">
            What are you in the mood for?
          </h1>
        </div>
        <SearchBar value={query} onChange={onQueryChange} />
      </div>
      {isSearching ? (
        <SearchResults searchQuery={searchQuery} />
      ) : (
        <div className="flex flex-col gap-14">
          <SuggestedForYouSection />
          <TrendingSection />
          <PopularSection />
        </div>
      )}
    </div>
  );
}
