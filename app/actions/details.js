import { FETCHING_DETAILS, FETCHING_DETAILS_SUCCES, FETCHING_DETAILS_FAILURE } from "../constants"
import MAL from "react-native-mal-scrape"
const mal = new MAL()

export function fetchDetails() {
  return (dispatch) => {
    dispatch(fetchDetailsStart())
    mal.getDetails(5114)
      .then(anime => dispatch(fetchDetailsSuccess(anime)))
      .catch(e => dispatch(fetchDetailsFailure()))
  }
}

export function fetchDetailsStart() {
  return {
    type: FETCHING_DETAILS
  }
}

export function fetchDetailsSuccess(data) {
  return {
    type: FETCHING_DETAILS_SUCCES,
    data,
  }
}

export function fetchDetailsFailure() {
  return {
    type: FETCHING_DETAILS_FAILURE
  }
}
