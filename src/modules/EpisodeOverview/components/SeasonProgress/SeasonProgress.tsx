import { SeasonDetails } from "@/core/api/interface"
import { Checkbox, Text, Badge, Accordion } from "@/shared/ui"

import * as S from "./styles"

interface SeasonProgressProps {
  seasons: SeasonDetails[]
  watchedShows: string[]
  onChange: (checked: boolean, id: string) => void
}

const formatSeasonProgress = (
  season: SeasonDetails,
  watchedShows: string[]
) => {
  if (!season.episodes) return ""

  const currentEpisodeCount = season.episodes.filter((e) =>
    watchedShows.includes(e.id.toString())
  ).length

  return `${currentEpisodeCount} / ${season.episodes.length}`
}

export const SeasonProgress = ({
  seasons,
  watchedShows,
  onChange,
}: SeasonProgressProps) => {
  console.log("Rerendering season progress")
  return (
    <Accordion.Root collapsible>
      {seasons.map((season) => (
        <Accordion.Item key={season.id} value={season.id.toString()}>
          <Accordion.ItemTrigger>
            <Text>
              Season {season.season_number + 1}: {season.name}
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
                      checked={watchedShows.includes(episode.id.toString())}
                      onCheckedChange={(e) =>
                        onChange(!!e.checked, episode.id.toString())
                      }
                    >
                      {episode.name}
                    </Checkbox>
                  </S.EpisodeItem>
                )
              })
            ) : (
              <Text key={season.id}>No season episode info.</Text>
            )}
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
