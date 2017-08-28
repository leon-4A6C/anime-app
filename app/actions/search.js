import { FETCHING_SEARCH, FETCHING_SEARCH_SUCCES, FETCHING_SEARCH_FAILURE } from "../constants"
import MAL from "react-native-mal-scrape"
const mal = new MAL()

export function fetchSearch(name, options) {
  return (dispatch) => {
    dispatch(fetchSearchStart())
    mal.search(name, options)
      .then(animes => dispatch(fetchSearchSuccess(animes)))
      .catch(e => dispatch(fetchSearchFailure()))
  }
}

export function fetchSearchStart() {
  return {
    type: FETCHING_SEARCH
  }
}

export function fetchSearchSuccess(data) {
  return {
    type: FETCHING_SEARCH_SUCCES,
    data,
  }
}

export function fetchSearchFailure() {
  return {
    type: FETCHING_SEARCH_FAILURE
  }
}
