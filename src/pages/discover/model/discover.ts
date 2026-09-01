import { useSearchMedia } from "@/features/search-media";

export function useDiscoverSearch(query: string) {
  const searchQuery = useSearchMedia(query);

  return { searchQuery };
}
