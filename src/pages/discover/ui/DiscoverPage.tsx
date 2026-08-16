import { useDiscoverSearch } from "../model/discover";
import { PopularSection } from "./PopularSection";
import { SearchBar } from "./SearchBar";
import { SearchResults } from "./SearchResults";
import { TrendingSection } from "./TrendingSection";

export function DiscoverPage() {
  const { query, setQuery, searchQuery } = useDiscoverSearch();
  const isSearching = query.trim().length > 0;

  return (
    <div className="flex flex-col gap-6">
      <SearchBar value={query} onChange={setQuery} />
      {isSearching ? (
        <SearchResults searchQuery={searchQuery} />
      ) : (
        <>
          <TrendingSection />
          <PopularSection />
        </>
      )}
    </div>
  );
}
