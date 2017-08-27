import { FETCHING_EPISODES, FETCHING_EPISODES_SUCCES, FETCHING_EPISODES_FAILURE } from "../constants"

const initialState = {
  episodes: {},
  isFetching: false,
  error: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHING_EPISODES:
      return {
        ...state,
        episodes: {},
        isFetching: true,
        error: false
      }
    case FETCHING_EPISODES_SUCCES:
      return {
        ...state,
        isFetching: false,
        episodes: action.data
      }
    case FETCHING_EPISODES_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }

    default:
      return state
  }
}
