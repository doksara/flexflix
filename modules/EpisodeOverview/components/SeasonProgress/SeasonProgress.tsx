import { Text, Collapse, Progress, Checkbox, Badge } from '@nextui-org/react'
import { useMemo } from 'react'
import { SeasonDetails } from "../../../../interface"

import * as S from './styles'

interface SeasonProgressProps {
  season: SeasonDetails
  watchedShows: string[]
  onChange: (checked: boolean, id: string) => void
}

export const SeasonProgress = ({ season, watchedShows, onChange }: SeasonProgressProps) => {

  if (!season.episodes) {
    return <Text>No season episode info.</Text>
  }
  
  return (
    <>
      <Collapse.Group key={season._id}>
        <Collapse 
          contentLeft={
            <Badge isSquared color="secondary" variant="flat">
              {season.episodes.filter(e => watchedShows.includes(e.id.toString())).length} / {season.episodes.length}
            </Badge>
          } 
          title={`Season ${season.season_number + 1}: ${season.name}`}>
          <Checkbox.Group value={watchedShows} aria-label="Choose episodes">
            {season.episodes.map(episode => {
              return (
                <S.EpisodeItem key={episode.id}>
                  <Checkbox
                    label={episode.name}
                    value={episode.id.toString()}
                    onChange={(e) => onChange(e, episode.id.toString())} 
                    size="md" 
                    color="secondary"
                  />
                </S.EpisodeItem>
              )
            })}
          </Checkbox.Group>
        </Collapse>
      </Collapse.Group>
    </>
  )
}