import { Collapse, Checkbox, Progress, Text, styled, Button, Loading } from '@nextui-org/react'
import { SeasonDetails } from '../../interface'
import { useEffect, useMemo, useReducer, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Database } from '../../lib/supabase/database.types'
import { useRouter } from 'next/router'

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
  const [isLoading, setIsLoading] = useState(false)

  const supabaseClient = useSupabaseClient<Database>()
  const router = useRouter()

  const seasonProgress = useMemo(() => {
    if (season.episodes) {
      Object
        .keys(state.watchedShows)
        .reduce((acc: number, item: string) => {
          const numberKey = Number(item)

          if (state.watchedShows[numberKey]) acc += 1
          return acc
      }, 0) / season.episodes.length * 100
    }

    return 0
  }, [state.watchedShows, season.episodes])

  useEffect(() => {
    // set default state here
  }, [])

  const onChange = (checked: boolean, id: number) => {
    dispatch({ 
      type: checked ? ReducerActionType.MARK_WATCHED : ReducerActionType.MARK_NOT_WATCHED, 
      payload: id 
    })
  }

  const onSaveProgress = async () => {
    setIsLoading(true)

    const { id } = router.query
    const watchedShowIds = Object
      .keys(state.watchedShows)
      .map(s => Number(s))

    const { data: { user } } = await supabaseClient
      .auth
      .getUser()

    await supabaseClient
      .from('user_tvshow')
      .insert({ 
        has_started_watching: true,
        watched_episodes: watchedShowIds,
        user: user?.id,
        show_id: Number(id)
      })
      
    setIsLoading(false)
  }

  if (!season.episodes) {
    // TODO - convert this to empty state component
    return <Text>No season episode info.</Text>
  }

  return (    
    <>
      <Progress color="primary" value={seasonProgress} />
      <Collapse.Group>
        <Collapse title={`Season ${season.season_number + 1}: ${season.name}`}>
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
      <Button disabled={isLoading} onPress={onSaveProgress} color="primary" css={{ px: "$13", w: "100%" }}>
        {isLoading 
          ? <Loading color="currentColor" size="sm" />
          : <span>Save progress</span>
        }
      </Button>
    </>
  )
}