import {
  FAVORITES_GET,
  FAVORITES_GET_SUCCES,
  FAVORITES_GET_FAILURE,
  FAVORITES_SET,
  FAVORITES_SET_SUCCES,
  FAVORITES_SET_FAILURE,
  FAVORITES_CHECK,
  FAVORITES_CHECK_SUCCES,
  FAVORITES_CHECK_FAILURE,
  FAVORITES_ADD,
  FAVORITES_ADD_SUCCES,
  FAVORITES_ADD_FAILURE,
  FAVORITES_REMOVE,
  FAVORITES_REMOVE_SUCCES,
  FAVORITES_REMOVE_FAILURE,
} from "../constants"

const initialState = {
  favorites: {},
  isFetching: false,
  set: false,
  add: false,
  remove: false,
  check: false,
  error: false,
  errorMessage: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FAVORITES_GET:
      return {
        ...state,
        favorites: {},
        isFetching: true,
        error: false,
        errorMessage: null
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
        error: true,
        errorMessage: action.data
      }
      break;
    case FAVORITES_SET:
      return {
        ...state,
        isFetching: true,
        error: false,
        errorMessage: null
      }
      break;
    case FAVORITES_SET_SUCCES:
      return {
        ...state,
        isFetching: false,
        set: true,
        error: false
      }
      break;
    case FAVORITES_SET_FAILURE:
      return {
        ...state,
        isFetching: false,
        set: false,
        error: true,
        errorMessage: action.data
      }
      break;
    case FAVORITES_CHECK:
      return {
        ...state,
        isFetching: true,
        check: false,
        error: false,
        errorMessage: null
      }
      break;
    case FAVORITES_CHECK_SUCCES:
      return {
        ...state,
        isFetching: false,
        check: action.data,
        error: false
      }
      break;
    case FAVORITES_CHECK_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMessage: action.data
      }
      break;
    case FAVORITES_ADD:
      return {
        ...state,
        isFetching: true,
        add: false,
        error: false,
        errorMessage: null
      }
      break;
    case FAVORITES_ADD_SUCCES:
      return {
        ...state,
        isFetching: false,
        add: true,
        error: false
      }
      break;
    case FAVORITES_ADD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMessage: action.data
      }
      break;
    case FAVORITES_REMOVE:
      return {
        ...state,
        isFetching: true,
        remove: false,
        error: false,
        errorMessage: null
      }
      break;
    case FAVORITES_REMOVE_SUCCES:
      return {
        ...state,
        isFetching: false,
        remove: true,
        error: false
      }
      break;
    case FAVORITES_REMOVE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMessage: action.data
      }
      break;

    default:
      return state
  }
}
