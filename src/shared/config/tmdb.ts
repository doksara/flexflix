export const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

// Read-access token is designed by TMDB to be used client-side (no backend proxy in this project).
// Left unvalidated here since this module is eagerly evaluated via the shared/api barrel;
// tmdbFetch validates it lazily, only when a request actually needs it.
export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY as
  | string
  | undefined;
