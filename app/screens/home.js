import React from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";
import { Toolbar } from "react-native-material-ui"
import { connect } from "react-redux"

import { top } from "../actions"
import { Item } from "../components"

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
  }

  searchAnime(text) {
    // trigger search action
  }

  render() {
    return (<Toolbar
        centerElement="anime"
        searchable={{
          autoFocus: true,
          placeholder: 'Search',
          onSubmitEditing: this.searchAnime.bind(this)
        }}/>)
  }

}

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      limit: 0
    }
  }

  static navigationOptions = ({navigation}) => ({
    title: "home",
    header: (<SearchBar/>)
  })

  _load() {
    console.log("load req");
    if (!this.props.top.isFetching) {
      const { limit } = this.state;
      this.props.getTop({limit: limit})
      this.setState({
        limit: limit + 50
      })
    }
  }

  render() {
    return (
      <FlatList
        data={this.props.top.animes}
        renderItem={({item}) => (<Item
                                  uri={item.posters.big}
                                  name={item.title}
                                  id={item.id}
                                  rank={item.ranking}/>)}
        onEndReached={this._load.bind(this)}
        onEndReachedThreshold={0 /*adjust as needed*/}
        keyExtractor={(x) => x.id}
        numColumns={3}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    top: state.top
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getTop: (options) => dispatch(top.fetchTop(options))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {

  },
});
