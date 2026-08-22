import { useQuery } from "@tanstack/react-query";

import { getMovieDetails, getTvDetails } from "@/shared/api";

export function useMovieDetails(id: number) {
  return useQuery({
    queryKey: ["movie", id, "details"],
    queryFn: () => getMovieDetails(id),
  });
}

export function useTvDetails(id: number) {
  return useQuery({
    queryKey: ["tv", id, "details"],
    queryFn: () => getTvDetails(id),
  });
}
