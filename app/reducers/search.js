import { FETCHING_SEARCH, FETCHING_SEARCH_SUCCES, FETCHING_SEARCH_FAILURE } from "../constants"

const initialState = {
  results: [],
  isFetching: false,
  error: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHING_SEARCH:
      return {
        ...state,
        results: [],
        isFetching: true,
        error: false
      }
      break;
    case FETCHING_SEARCH_SUCCES:
      return {
        ...state,
        isFetching: false,
        results: action.data,
        error: false
      }
      break;
    case FETCHING_SEARCH_FAILURE:
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
