import { FETCHING_TOP, FETCHING_TOP_SUCCES, FETCHING_TOP_FAILURE } from "../constants"

const initialState = {
  animes: [],
  isFetching: false,
  error: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHING_TOP:
      return {
        ...state,
        animes: [],
        isFetching: true,
        error: false
      }
      break;
    case FETCHING_TOP_SUCCES:
      return {
        ...state,
        isFetching: false,
        animes: action.data
      }
      break;
    case FETCHING_TOP_FAILURE:
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
