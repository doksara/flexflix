export interface State {
  watchedShows: number[]
  hasChanges: boolean
}

export enum ReducerActionType {
  MARK_WATCHED = "MARK_WATCHED",
  MARK_NOT_WATCHED = "MARK_NOT_WATCHED",
  SET_BATCH = "SET_BATCH",
  SET_DEFAULT = "SET_DEFAULT",
  RESET = "RESET",
}

interface ReducerAction {
  type: ReducerActionType
  payload?: number | number[]
}

export const reducer = (state: State, action: ReducerAction) => {
  const { type, payload } = action

  switch (type) {
    case ReducerActionType.MARK_WATCHED:
      return {
        ...state,
        watchedShows: [...state.watchedShows, +payload!],
        hasChanges: true,
      }
    case ReducerActionType.MARK_NOT_WATCHED:
      return {
        ...state,
        watchedShows: [...state.watchedShows.filter((ws) => ws !== +payload!)],
        hasChanges: true,
      }
    case ReducerActionType.SET_BATCH:
      return {
        ...state,
        watchedShows: [...(payload as number[])],
        hasChanges: true,
      }
    case ReducerActionType.SET_DEFAULT:
      return {
        ...state,
        watchedShows: [], // TODO - fix this
        hasChanges: false,
      }
    case ReducerActionType.RESET:
      return {
        ...state,
        hasChanges: false,
      }
    default:
      return state
  }
}
