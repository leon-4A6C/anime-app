import { FETCHING_DETAILS, FETCHING_DETAILS_SUCCES, FETCHING_DETAILS_FAILURE } from "../constants"

const initialState = {
  details: {},
  isFetching: false,
  error: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHING_DETAILS:
      return {
        ...state,
        details: {},
        isFetching: true,
        error: false
      }
      break;
    case FETCHING_DETAILS_SUCCES:
      return {
        ...state,
        isFetching: false,
        details: action.data
      }
      break;
    case FETCHING_DETAILS_FAILURE:
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
