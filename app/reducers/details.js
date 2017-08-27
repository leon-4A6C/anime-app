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
    case FETCHING_DETAILS_SUCCES:
      return {
        ...state,
        isFetching: false,
        details: action.data
      }
    case FETCHING_DETAILS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }

    default:
      return state
  }
}
