type TimeWindow = "day" | "week"

export const trending = (timeWindow: TimeWindow = "week") =>
  `/trending/tv/${timeWindow}`
