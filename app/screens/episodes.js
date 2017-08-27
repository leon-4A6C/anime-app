import React from "react"
import {
  View,
  SectionList,
  Text,
  StyleSheet
} from "react-native"
import { connect } from "react-redux"

import { episodes, episode } from "../actions"
import { Episode } from "../components"

class Episodes extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: "episodes",
  })

  componentDidMount() {
    const { name, id } = this.props.navigation.state.params;
    this.props.getEpisodes(name, id);
  }

  episodePress(props, state) {
    // fire episode action and open video player
    console.log("episode "+props.episodeNumber+" is pressed!")
    console.log(this.props.episodes)
  }

  render() {
    const { episodes } = this.props.episodes
    // remap data
    const eps = [];
    for (let key in episodes) {
      if (episodes.hasOwnProperty(key)) {
        let element = episodes[key];
        eps.push(element);
      }
    }

    const next = []
    for(let i = 0; i < Math.min(3, eps.length); i++) {
      next.push(eps[i]);
    }

    return (
      <View>
        <SectionList 
          sections={[ // heterogeneous rendering between sections
              {data: next, title: "next episodes"},
              {data: eps, title: "all episodes"},
            ]}
          renderItem={({item}) => <Episode episodeName={item.titles[1]} style={styles.item} episodeNumber={item.episode} onPress={this.episodePress.bind(this)}/>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item) => item.episode}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

function mapStateToProps(state) {
  return {
    episodes: state.episodes
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getEpisodes: (name, id) => dispatch(episodes.fetchEpisodes(name, id)),
    getEpisode: (episode) => dispatch(episode.fetchEpisode(episode)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Episodes);
