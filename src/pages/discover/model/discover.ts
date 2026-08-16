import { useState } from "react";

import { useSearchMedia } from "@/features/search-media";

export function useDiscoverSearch() {
  const [query, setQuery] = useState("");
  const searchQuery = useSearchMedia(query);

  return { query, setQuery, searchQuery };
}
