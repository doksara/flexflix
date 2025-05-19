type TimeWindow = "day" | "week"

export const trending = (timeWindow: TimeWindow = "week") =>
  `/trending/tv/${timeWindow}`

export const details = (id: number) => `/tv/${id}&language=en-US`

export const detailsWithSeasons = (id: number, appendToResponse: string) =>
  `/tv/${id}?append_to_response=${appendToResponse}&language=en-US`

export const seasonDetails = (id: number, seasonNumber: number) =>
  `/tv/${id}/season/${seasonNumber}&language=en-US`
