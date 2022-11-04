import { Collapse, Checkbox, Progress, Text, Button, Loading } from '@nextui-org/react'
import { SeasonDetails } from '../../interface'
import { useEffect, useMemo, useReducer, useState } from 'react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Database } from '../../lib/supabase/database.types'
import { useRouter } from 'next/router'
import { reducer, ReducerActionType, State } from './reducer'

import * as S from './styles'

interface EpisodeOverviewProps {
  season: SeasonDetails
}

const initialState: State = {
  watchedShows: []
}

export const EpisodeOverview = ({ season }: EpisodeOverviewProps) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState(false)

  const supabaseClient = useSupabaseClient<Database>()
  const router = useRouter()
  const user = useUser()
  const { id } = router.query

  useEffect(() => {
    if (user) {
      supabaseClient
        .from('user_tvshow')
        .select('watched_episodes')
        .eq('user', user.id)
        .eq('show_id', id)
        .then(episodes => {
          if (episodes.data && episodes.data[0]) {
            dispatch({
              type: ReducerActionType.SET_BATCH,
              payload: episodes.data[0].watched_episodes!.map(t => t.toString())
            })
          }
        })
    }
  }, [id, supabaseClient, user])

  const seasonProgress = useMemo(() => {
    console.log(season.episodes?.length)
    if (season.episodes) {
      return state.watchedShows.length / season.episodes.length * 100
    }

    return 0
  }, [state.watchedShows, season.episodes])

  useEffect(() => {
    // set default state here
  }, [])

  const onChange = (checked: boolean, id: number) => {
    dispatch({ 
      type: checked ? ReducerActionType.MARK_WATCHED : ReducerActionType.MARK_NOT_WATCHED, 
      payload: id.toString()
    })
  }

  const onSaveProgress = async () => {
    setIsLoading(true)

    const { id } = router.query
    const watchedShowIds = state.watchedShows.map(s => Number(s))

    const existingRowId = await supabaseClient
      .from('user_tvshow')
      .select('id')
      .eq("show_id", id)
      .eq("user", user?.id)
      .then(res => {
        if (res.data && res.data.length) {
          return res.data[0].id
        }
      })
            
    await supabaseClient
      .from('user_tvshow')
      .upsert({ 
        id: existingRowId,
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
          <Checkbox.Group value={state.watchedShows} aria-label="Choose episodes">
            {season.episodes.map(episode => {
              return (
                <S.EpisodeItem key={episode.id}>
                  <p>{episode.name}</p>
                  <Checkbox
                    aria-label={episode.name}
                    value={episode.id.toString()}
                    onChange={(e) => onChange(e, episode.id)} 
                    size="xl" 
                    color="secondary"
                  />
                </S.EpisodeItem>
              )
            })}
          </Checkbox.Group>
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