export const MediaType = {
  Movie: "movie",
  TvShow: "tv",
} as const;

export type MediaType = (typeof MediaType)[keyof typeof MediaType];
