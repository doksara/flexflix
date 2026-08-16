import { TMDB_IMAGE_BASE_URL } from "@/shared/config";

export function posterUrl(posterPath: string | null, size: "w185" | "w342" = "w342"): string | null {
  if (!posterPath) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${posterPath}`;
}

export function backdropUrl(backdropPath: string | null, size: "w780" | "w1280" = "w1280"): string | null {
  if (!backdropPath) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${backdropPath}`;
}

export function stillUrl(stillPath: string | null, size: "w185" | "w300" = "w300"): string | null {
  if (!stillPath) return null;
  return `${TMDB_IMAGE_BASE_URL}/${size}${stillPath}`;
}
