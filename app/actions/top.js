import { FETCHING_TOP, FETCHING_TOP_SUCCES, FETCHING_TOP_FAILURE } from "../constants"
import MAL from "react-native-mal-scrape"
const mal = new MAL()

export function fetchTop(options) {
  return (dispatch) => {
    dispatch(fetchTopStart())
    mal.topAnime(options)
      .then(animes => dispatch(fetchTopSuccess(animes)))
      .catch(e => dispatch(fetchTopFailure()))
  }
}

export function fetchTopStart() {
  return {
    type: FETCHING_TOP
  }
}

export function fetchTopSuccess(data) {
  return {
    type: FETCHING_TOP_SUCCES,
    data,
  }
}

export function fetchTopFailure() {
  return {
    type: FETCHING_TOP_FAILURE
  }
}
