import { UPDATE, UPDATE_SUCCES, UPDATE_FAILURE } from "../constants"

const initialState = {
  update: false,
  isFetching: false,
  error: false,
  errorMessage: null,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        update: false,
        isFetching: true,
        error: false,
        errorMessage: null,
      }
      break;
    case UPDATE_SUCCES:
      return {
        ...state,
        isFetching: false,
        update: action.data,
        error: false
      }
      break;
    case UPDATE_FAILURE:
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
