import React from "react"
import {
  SectionList,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native"
import { connect } from "react-redux"

import { episodes, episode } from "../actions"
import { Episode } from "../components"
import uiTheme from "../uiTheme"

class Episodes extends React.Component {

  state = {
    title: "",
    episode: 0,
  }

  static errorShown = {error: false};

  static navigationOptions = ({navigation}) => ({
    title: "episodes",
  })

  componentDidMount() {
    const { title, id } = this.props.navigation.state.params.data;
    this.props.getEpisodes(title, id);
  }

  episodePress(props, state) {
    // fire episode action and open video player
    const episode = this.props.episodes.episodes[props.episodeNumber];
    this.props.getEpisode(episode)
    this.setState({
      title: episode.titles[0] || episode.titles[1],
      episode: props.episodeNumber
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.episode.isFetching && this.constructor.errorShown.error) {
      this.constructor.errorShown.error = false;
    }
    if(prevProps.episode.isFetching && !this.props.episode.isFetching && !this.props.episode.error) {
      this.props.navigation.navigate("VideoPlayer", {video: this.props.episode.episode[0], title: this.state.title, episode: this.state.episode}) // pass the title and episode
    } else if(this.props.episode.error && !this.constructor.errorShown.error) {
      Alert.alert("error", "The application couldn't retrieve the file.\r\nThe file may have been taken down.")
      this.constructor.errorShown.error = true;
    }
  }

  render() {
    const { episodes, isFetching } = this.props.episodes
    if(isFetching) {
      return (
        <ActivityIndicator style={styles.loader} size="large" />
      )
    } else {
      // remap data
      const eps = [];
      for (let key in episodes) {
        if (episodes.hasOwnProperty(key)) {
          let element = episodes[key];
          eps.push(element);
        }
      }

      // todo: get saved stuff
      const next = []
      for(let i = 0; i < Math.min(3, eps.length); i++) {
        next.push(eps[i]);
      }

      return (
        <SectionList 
          sections={[ // heterogeneous rendering between sections
              {data: next, title: "next episodes"},
              {data: eps, title: "all episodes"},
            ]}
          renderItem={({item}) => <Episode episodeName={item.titles[1] || item.titles[0]} episodeNumber={item.episode} onPress={this.episodePress.bind(this)}/>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item) => item.episode}
          />
      )
    }
  }
}

const styles = StyleSheet.create({
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: uiTheme.text.fontSize,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  loader: {
    marginTop: 10
  }
})

function mapStateToProps(state) {
  return {
    episodes: state.episodes,
    episode: state.episode,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getEpisodes: (name, id) => dispatch(episodes.fetchEpisodes(name, id)),
    getEpisode: (episodeInput) => dispatch(episode.fetchEpisode(episodeInput)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Episodes);
