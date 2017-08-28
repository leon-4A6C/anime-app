import { FETCHING_EPISODE, FETCHING_EPISODE_SUCCES, FETCHING_EPISODE_FAILURE } from "../constants"

const initialState = {
  episode: [],
  isFetching: false,
  error: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHING_EPISODE:
      return {
        ...state,
        episode: [],
        isFetching: true,
        error: false
      }
      break;
    case FETCHING_EPISODE_SUCCES:
      return {
        ...state,
        isFetching: false,
        episode: action.data
      }
      break;
    case FETCHING_EPISODE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
      break;

    default:
      return state
  }
}
