export interface State {
  watchedShows: number[]
}

export enum ReducerActionType {
  MARK_WATCHED = "MARK_WATCHED",
  MARK_NOT_WATCHED = "MARK_NOT_WATCHED",
  SET_BATCH = "SET_BATCH",
  SET_DEFAULT = "SET_DEFAULT",
}

interface ReducerAction {
  type: ReducerActionType
  payload: number | number[]
}

export const reducer = (state: State, action: ReducerAction) => {
  const { type, payload } = action

  switch (type) {
    case ReducerActionType.MARK_WATCHED:
      return {
        ...state,
        watchedShows: [...state.watchedShows, +payload],
      }
    case ReducerActionType.MARK_NOT_WATCHED:
      return {
        ...state,
        watchedShows: [...state.watchedShows.filter((ws) => ws !== +payload)],
      }
    case ReducerActionType.SET_BATCH:
      return {
        ...state,
        watchedShows: [...(payload as number[])],
      }
    case ReducerActionType.SET_DEFAULT:
      return {
        ...state,
        watchedShows: [], // TODO - fix this
      }
    default:
      return state
  }
}
