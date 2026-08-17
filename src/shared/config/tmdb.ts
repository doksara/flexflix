export const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// Read-access token is designed by TMDB to be used client-side (no backend proxy in this project).
export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;

if (!TMDB_API_KEY) {
  throw new Error(
    "Missing VITE_TMDB_API_KEY. Set it in your .env file (see .env.example).",
  );
}
