import { Text, Badge } from "@nextui-org/react"
import { Checkbox, CheckboxGroup } from "components/Checkbox"
import { Collapse } from "components/Collapse"
import { SeasonDetails } from "core/api/interface"

import * as S from "./styles"

interface SeasonProgressProps {
  season: SeasonDetails
  watchedShows: string[]
  onChange: (checked: boolean, id: string) => void
}

export const SeasonProgress = ({
  season,
  watchedShows,
  onChange,
}: SeasonProgressProps) => {
  if (!season.episodes) {
    return <Text>No season episode info.</Text>
  }

  return (
    <>
      <Collapse
        title={
          <>
            <Text>
              Season {season.season_number + 1}: {season.name}
            </Text>
            <Badge isSquared color="secondary" variant="flat">
              {
                season.episodes.filter((e) =>
                  watchedShows.includes(e.id.toString())
                ).length
              }{" "}
              / {season.episodes.length}
            </Badge>
          </>
        }
      >
        <CheckboxGroup initialValues={watchedShows}>
          {season.episodes.map((episode) => {
            return (
              <S.EpisodeItem key={episode.id}>
                <Checkbox
                  label={episode.name}
                  value={episode.id.toString()}
                  onChange={(e) =>
                    onChange(e.target.checked, episode.id.toString())
                  }
                />
              </S.EpisodeItem>
            )
          })}
        </CheckboxGroup>
      </Collapse>
    </>
  )
}
