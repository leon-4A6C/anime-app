import {
    FAVORITES_GET,
    FAVORITES_GET_SUCCES,
    FAVORITES_GET_FAILURE,
    FAVORITES_SET,
    FAVORITES_SET_SUCCES,
    FAVORITES_SET_FAILURE
} from "../constants"

const initialState = {
  favorites: [],
  isFetching: false,
  written: false,
  error: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FAVORITES_GET:
      return {
        ...state,
        favorites: [],
        isFetching: true,
        error: false
      }
      break;
    case FAVORITES_GET_SUCCES:
      return {
        ...state,
        isFetching: false,
        favorites: action.data,
        error: false
      }
      break;
    case FAVORITES_GET_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true
      }
      break;
      case FAVORITES_SET:
      return {
        ...state,
        isFetching: true,
        error: false
      }
      break;
    case FAVORITES_SET_SUCCES:
      return {
        ...state,
        isFetching: false,
        written: true,
        error: false
      }
      break;
    case FAVORITES_SET_FAILURE:
      return {
        ...state,
        isFetching: false,
        written: false,
        error: true
      }
      break;

    default:
      return state
  }
}
