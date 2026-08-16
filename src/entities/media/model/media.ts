export const MediaType = {
  Movie: "movie",
  TvShow: "tv",
} as const;

export type MediaType = (typeof MediaType)[keyof typeof MediaType];

export interface MediaSummary {
  id: number;
  mediaType: MediaType;
  title: string;
  posterPath: string | null;
  releaseDate: string | null;
  voteAverage: number;
  genreIds: number[];
}
