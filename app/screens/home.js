import React from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
} from "react-native";
import { connect } from "react-redux"

import { top } from "../actions"
import { Item, SearchBar } from "../components"

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      limit: 0,
      sort: "",
      sorting: {}
    }

    this.sortingList = [
      {
        label: "all",
        option: {}
      },
      {
        label: "airing",
        option: {
          type: "airing"
        }
      },
      {
        label: "upcoming",
        option: {
          type: "upcoming"
        }
      },
      {
        label: "tv series",
        option: {
          type: "tv"
        }
      },
      {
        label: "movies",
        option: {
          type: "movie"
        }
      },
      {
        label: "OVAs",
        option: {
          type: "ova"
        }
      },
      {
        label: "specials",
        option: {
          type: "special"
        }
      },
      {
        label: "popular",
        option: {
          type: "bypopularity"
        }
      },
      {
        label: "favorited",
        option: {
          type: "favorite"
        }
      },
    ]
  }

  searched(text) {
    console.log("searched for: " + text)
  }

  removeSearch(text) {
    console.log("remove search for: " + text)
  }

  optionsClick(option) {
    if(option.result == "itemSelected") {
      // reset the state
      this.setState({
        items: [], // remove all items
        sorting: this.sortingList[option.index].option,
        limit: 0 // start at the top again
      })
      this._load()
    }
  }

  componentDidMount() {
    // pass the functions to params of the nav
    this.props.navigation.setParams({
      onSearched: this.searched.bind(this),
      onRemoveSearch: this.removeSearch.bind(this),
      options: this.sortingList.map(x => x.label),
      onOptionsClick: this.optionsClick.bind(this),
    });
    // load initial items
    this._load()
  }

  static navigationOptions = ({navigation, screenProps}) => {
    const params = navigation.state.params || {};
    return {
      title: "home",
      header: (<SearchBar 
                onSearch={params.onSearched}
                onRemoveSearch={params.onRemoveSearch}
                onMenuClick={params.onMenuClick}
                onOptionsClick={params.onOptionsClick}
                options={params.options}
                />)
    }
  }

  _load() {
    console.log("hit bottom");
    if (!this.props.top.isFetching) {
      const { limit } = this.state;
      this.props.getTop({...this.state.sorting, limit: limit})
      this.setState({
        limit: limit + 50
      })
    }
  }

  _itemPress(props, state) {
    const { navigate } = this.props.navigation;
    navigate("ItemInfo", props);
  }

  _itemLongPress(props, state) {
    console.log("long press!")
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.top.isFetching && !this.props.top.isFetching) {
      this.setState({
        items: [...this.state.items, ...this.props.top.animes]
      })
    }
  }

  render() {
    return (
      <FlatList
        data={this.state.items}
        renderItem={({item}) => (<Item
                                  uri={item.posters.big}
                                  name={item.title}
                                  id={item.id}
                                  rank={item.ranking}
                                  onPress={this._itemPress.bind(this)}
                                  onLongPress={this._itemLongPress.bind(this)}/>)}
        onEndReached={this._load.bind(this)}
        onEndReachedThreshold={1 /*adjust as needed*/}
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
