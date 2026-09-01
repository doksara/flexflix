import { TMDB_API_BASE_URL, TMDB_API_KEY } from "@/shared/config";

import { acquireToken } from "./rate-limiter";

export class TmdbApiError extends Error {
  status: number;
  statusCode?: number;

  constructor(status: number, message: string, statusCode?: number) {
    super(message);
    this.name = "TmdbApiError";
    this.status = status;
    this.statusCode = statusCode;
  }
}

// TMDB status_code values for an invalid/suspended API key: the request never
// carried a valid user session, so this isn't a "session expired" situation.
const API_KEY_ERROR_CODES = new Set([7, 10]);

type UnauthorizedHandler = () => void;
let onUnauthorized: UnauthorizedHandler | null = null;

export function setUnauthorizedHandler(handler: UnauthorizedHandler | null) {
  onUnauthorized = handler;
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
  if (!TMDB_API_KEY) {
    throw new Error(
      "Missing VITE_TMDB_API_KEY. Set it in your .env file (see .env.example).",
    );
  }

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
    const errorBody: { status_code?: number; status_message?: string } | null =
      await response.json().catch(() => null);
    if (response.status === 401 && !API_KEY_ERROR_CODES.has(errorBody?.status_code ?? -1)) {
      onUnauthorized?.();
    }
    throw new TmdbApiError(
      response.status,
      errorBody?.status_message ?? response.statusText,
      errorBody?.status_code,
    );
  }

  return response.json() as Promise<T>;
}
