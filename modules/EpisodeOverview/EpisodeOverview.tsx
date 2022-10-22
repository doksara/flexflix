import { Collapse, Checkbox, Progress, styled } from '@nextui-org/react'
import { SeasonDetails } from '../../interface'
import { useEffect, useReducer } from 'react'

const EpisodeItem = styled('div', {
  display: "flex",
  justifyContent: 'flex-start',
  margin: 0
})

const EpisodeTitle = styled('h3', {

})

interface EpisodeOverviewProps {
  season: SeasonDetails
}

interface State {
  watchedShows: Record<number, boolean>
}

enum ReducerActionType {
  MARK_WATCHED = 'MARK_WATCHED',
  MARK_NOT_WATCHED = 'MARK_NOT_WATCHED',
  SET_DEFAULT = 'SET_DEFAULT'
}

interface ReducerAction {
  type: ReducerActionType;
  payload: number;
}

const reducer = (state: State, action: ReducerAction) => {
  const { type, payload } = action
  
  switch (type) {
    case ReducerActionType.MARK_WATCHED:
      return {
        ...state,
        watchedShows: {
          ...state.watchedShows,
          [payload]: true
        }
      }
    case ReducerActionType.MARK_WATCHED:
      return {
        ...state,
        watchedShows: {
          ...state.watchedShows,
          [payload]: false
        }
      }
    case ReducerActionType.SET_DEFAULT: 
      return {
        ...state,
        watchedShows: [] // TODO - fix this
      }
    default:
      return state
  }
}

const initialState = {
  watchedShows: {}
}

export const EpisodeOverview = ({ season }: EpisodeOverviewProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const seasonProgress = Object.keys(state.watchedShows).reduce((acc: number, item: string) => {
    const numberKey = Number(item)
    if (state.watchedShows[numberKey]) acc += 1
    return acc
  }, 0) / season.episodes.length * 100

  useEffect(() => {
    // set default state here
  }, [])

  const onChange = (checked: boolean, id: number) => {
    dispatch({ 
      type: checked ? ReducerActionType.MARK_WATCHED : ReducerActionType.MARK_NOT_WATCHED, 
      payload: id 
    })
  }

  return (
    <>
      <Progress color="primary" value={seasonProgress} />
      <Collapse.Group>
        <Collapse title={season.name}>
          {season.episodes.map(episode => {
            return (
              <EpisodeItem key={episode.id}>
                <p>{episode.name}</p>
                <Checkbox
                  aria-label={episode.name}
                  defaultSelected={state.watchedShows[episode.id]}
                  onChange={(e) => onChange(e, episode.id)} 
                  size="xl" 
                  color="secondary"
                />
              </EpisodeItem>
            )
          })}
        </Collapse>
      </Collapse.Group>
    </>
  )
}