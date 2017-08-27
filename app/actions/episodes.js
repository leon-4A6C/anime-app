import { FETCHING_EPISODES, FETCHING_EPISODES_SUCCES, FETCHING_EPISODES_FAILURE } from "../constants"
import PILL from "react-native-animepill-api"
const client = new PILL();

export function fetchEpisodes(name, id) {
  return (dispatch) => {
    dispatch(fetchEpisodesStart())
    client.search(name)
      .then(res => res.find(x => x.mal_id === id).getEpisodes())
      .then(eps => dispatch(fetchEpisodesSuccess(eps)))
      .catch(e => dispatch(fetchEpisodesFailure()))
  }
}

export function fetchEpisodesStart() {
  return {
    type: FETCHING_EPISODES
  }
}

export function fetchEpisodesSuccess(data) {
  return {
    type: FETCHING_EPISODES_SUCCES,
    data,
  }
}

export function fetchEpisodesFailure() {
  return {
    type: FETCHING_EPISODES_FAILURE
  }
}
