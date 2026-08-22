import { MediaGrid } from "@/entities/media";

import type { useDiscoverSearch } from "../model/discover";

interface SearchResultsProps {
  searchQuery: ReturnType<typeof useDiscoverSearch>["searchQuery"];
}

export function SearchResults({ searchQuery }: SearchResultsProps) {
  if (searchQuery.isError) {
    return (
      <p className="text-sm text-destructive">
        Something went wrong while searching. Try again.
      </p>
    );
  }

  return (
    <MediaGrid media={searchQuery.data} isLoading={searchQuery.isLoading} />
  );
}
