import React from "react"
import {
  View,
} from "react-native"
import { connect } from "react-redux"

import { episodes, episode } from "../actions"

class Episodes extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: "episodes",
  })

  render() {
    return (
      <View>

      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    episodes: state.episodes,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getEpisodes: (name, id) => episodes.fetchEpisodes(name, id),
    getEpisode: (episode) => episode.fetchEpisode(episode),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Episodes);
