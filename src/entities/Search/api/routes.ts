export const multi = (query: string) =>
  `/search/multi?query=${encodeURIComponent(query)}`
