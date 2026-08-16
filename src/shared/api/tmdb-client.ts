import { TMDB_API_BASE_URL, TMDB_API_KEY } from "@/shared/config";

import { acquireToken } from "./rate-limiter";

export class TmdbApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "TmdbApiError";
    this.status = status;
  }
}

interface TmdbRequestOptions {
  method?: "GET" | "POST" | "DELETE";
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
}

export async function tmdbFetch<T>(
  path: string,
  options: TmdbRequestOptions = {},
): Promise<T> {
  await acquireToken();

  const url = new URL(`${TMDB_API_BASE_URL}${path}`);
  for (const [key, value] of Object.entries(options.params ?? {})) {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  }

  const response = await fetch(url, {
    method: options.method ?? "GET",
    headers: {
      Authorization: `Bearer ${TMDB_API_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const errorBody: { status_message?: string } | null = await response
      .json()
      .catch(() => null);
    throw new TmdbApiError(
      response.status,
      errorBody?.status_message ?? response.statusText,
    );
  }

  return response.json() as Promise<T>;
}
