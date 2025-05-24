import { SeasonDetails } from "@/shared/lib/tmdb/interface"
import { Checkbox, Text, Badge, Accordion } from "@/shared/ui"

import * as S from "./styles"

interface SeasonProgressProps {
  seasons: SeasonDetails[]
  watchedShows: number[]
  onChange: (checked: boolean, id: number) => void
}

const formatSeasonProgress = (
  season: SeasonDetails,
  watchedShows: number[]
) => {
  if (!season.episodes) return ""

  const currentEpisodeCount = season.episodes.filter((e) =>
    watchedShows.includes(e.id)
  ).length

  return `${currentEpisodeCount} / ${season.episodes.length}`
}

export const SeasonProgress = ({
  seasons,
  watchedShows,
  onChange,
}: SeasonProgressProps) => {
  return (
    <Accordion.Root collapsible borderBottom="none">
      {seasons.map((season) => (
        <Accordion.Item key={season._id} value={season._id.toString()}>
          <Accordion.ItemTrigger>
            <Text>
              Season {season.season_number}: {season.name}
            </Text>
            <Badge>{formatSeasonProgress(season, watchedShows)}</Badge>
          </Accordion.ItemTrigger>

          <Accordion.ItemContent>
            {season.episodes ? (
              season.episodes.map((episode) => {
                return (
                  <S.EpisodeItem key={episode.id}>
                    <Checkbox
                      value={episode.id.toString()}
                      checked={watchedShows.includes(episode.id)}
                      onCheckedChange={(e) => onChange(!!e.checked, episode.id)}
                    >
                      {episode.name}
                    </Checkbox>
                  </S.EpisodeItem>
                )
              })
            ) : (
              <Text key={season._id}>No season episode info.</Text>
            )}
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
