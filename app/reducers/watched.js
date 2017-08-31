import {
  WATCHED_GET,
  WATCHED_GET_SUCCES,
  WATCHED_GET_FAILURE,
  WATCHED_SET,
  WATCHED_SET_SUCCES,
  WATCHED_SET_FAILURE,
  WATCHED_CHECK,
  WATCHED_CHECK_SUCCES,
  WATCHED_CHECK_FAILURE,
  WATCHED_ADD,
  WATCHED_ADD_SUCCES,
  WATCHED_ADD_FAILURE,
  WATCHED_REMOVE,
  WATCHED_REMOVE_SUCCES,
  WATCHED_REMOVE_FAILURE,
} from "../constants"

const initialState = {
  watched: {},
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
    case WATCHED_GET:
      return {
        ...state,
        watched: {},
        isFetching: true,
        error: false,
        errorMessage: null
      }
      break;
    case WATCHED_GET_SUCCES:
      return {
        ...state,
        isFetching: false,
        watched: action.data,
        error: false
      }
      break;
    case WATCHED_GET_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMessage: action.data
      }
      break;
    case WATCHED_SET:
      return {
        ...state,
        isFetching: true,
        error: false,
        errorMessage: null
      }
      break;
    case WATCHED_SET_SUCCES:
      return {
        ...state,
        isFetching: false,
        set: true,
        error: false
      }
      break;
    case WATCHED_SET_FAILURE:
      return {
        ...state,
        isFetching: false,
        set: false,
        error: true,
        errorMessage: action.data
      }
      break;
    case WATCHED_CHECK:
      return {
        ...state,
        isFetching: true,
        check: false,
        error: false,
        errorMessage: null
      }
      break;
    case WATCHED_CHECK_SUCCES:
      return {
        ...state,
        isFetching: false,
        check: action.data,
        error: false
      }
      break;
    case WATCHED_CHECK_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMessage: action.data
      }
      break;
    case WATCHED_ADD:
      return {
        ...state,
        isFetching: true,
        add: false,
        error: false,
        errorMessage: null
      }
      break;
    case WATCHED_ADD_SUCCES:
      return {
        ...state,
        isFetching: false,
        add: true,
        error: false
      }
      break;
    case WATCHED_ADD_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
        errorMessage: action.data
      }
      break;
    case WATCHED_REMOVE:
      return {
        ...state,
        isFetching: true,
        remove: false,
        error: false,
        errorMessage: null
      }
      break;
    case WATCHED_REMOVE_SUCCES:
      return {
        ...state,
        isFetching: false,
        remove: true,
        error: false
      }
      break;
    case WATCHED_REMOVE_FAILURE:
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
