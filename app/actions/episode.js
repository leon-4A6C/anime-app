import { FETCHING_EPISODE, FETCHING_EPISODE_SUCCES, FETCHING_EPISODE_FAILURE } from "../constants"

export function fetchEpisode(episode) {
  return (dispatch) => {
    dispatch(fetchEpisodeStart())
    episode.getEpisode()
        .then(vids => dispatch(fetchEpisodeSuccess(vids)))
        .catch(e => dispatch(fetchEpisodeFailure()))
  }
}

export function fetchEpisodeStart() {
  return {
    type: FETCHING_EPISODE
  }
}

export function fetchEpisodeSuccess(data) {
  return {
    type: FETCHING_EPISODE_SUCCES,
    data,
  }
}

export function fetchEpisodeFailure() {
  return {
    type: FETCHING_EPISODE_FAILURE
  }
}
