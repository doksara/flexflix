import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { multiSearchToSummary } from "@/entities/media";
import { searchMulti } from "@/shared/api";

function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timeout);
  }, [value, delayMs]);

  return debounced;
}

export function useSearchMedia(query: string) {
  const debouncedQuery = useDebouncedValue(query.trim(), 400);

  return useQuery({
    queryKey: ["search", "multi", debouncedQuery],
    queryFn: async () => {
      const data = await searchMulti(debouncedQuery);
      return data.results
        .map(multiSearchToSummary)
        .filter((item) => item !== null);
    },
    enabled: debouncedQuery.length > 0,
  });
}
