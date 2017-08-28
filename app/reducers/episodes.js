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
      break;
    case FETCHING_EPISODES_SUCCES:
      return {
        ...state,
        isFetching: false,
        episodes: action.data
      }
      break;
    case FETCHING_EPISODES_FAILURE:
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
