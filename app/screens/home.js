import React from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  ToastAndroid
} from "react-native";
import { connect } from "react-redux"

import { top, search } from "../actions"
import { Item, SearchBar } from "../components"

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      numRows: 3,
      limit: 0,
      sort: "",
      sorting: {},
      searchText: "",
      isSearch: false,
      show: 0, // same as limit but then for searches
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
    this.setState({
      items: [],
      isSearch: true,
      show: 0,
      limit: 0,
      searchText: text
    })
    setTimeout(() => {
      this._load()
    }, 10)
  }

  removeSearch(text) {
    this.setState({
      items: [],
      isSearch: false,
      show: 0,
      limit: 0,
      searchText: ""
    })
    setTimeout(() => {
      this._load()
    }, 10)
  }

  optionsClick(option) {
    if(option.result == "itemSelected") {
      // reset the state
      this.setState({
        items: [], // remove all items
        sorting: this.sortingList[option.index].option,
        limit: 0 // start at the top again
      })
      setTimeout(() => {
        this._load()
      }, 10)
    }
  }

  onLeftElementPress() {
    this.props.navigation.navigate("Settings")
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

  static navigationOptions = ({navigation, screenProps}) => ({
    title: "popular"
  })

  _load() {
    const { limit, show, searchText } = this.state;
    
    if (!this.props.top.isFetching && !this.state.isSearch) {
      this.props.getTop({...this.state.sorting, limit})
      this.setState({
        limit: limit + 50
      })
    }
    if (!this.props.searchResult.isFetching && this.state.isSearch) {
      this.props.search(searchText, {show})
      this.setState({
        show: show + 50
      })
    }
  }

  _itemPress(props, state) {
    const { navigate } = this.props.navigation;
    navigate("ItemInfo", {data: props.data});
  }

  _itemLongPress(props, state) {
    console.log("long press!")
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.top.isFetching && !this.props.top.isFetching && !this.state.isSearch) {
      this.setState({
        items: [...this.state.items, ...this.props.top.animes]
      })
    }
    if(prevProps.searchResult.isFetching && !this.props.searchResult.isFetching && this.state.isSearch) {
      this.setState({
        items: [...this.state.items, ...this.props.searchResult.results]
      })
    }
  }

  layoutChange(evt) {
    // do something like this, but not this, because changing numColumns on the fly gives an error
    // const { height, width } = evt.nativeEvent.layout;
    // if(height > width) {
    //   this.setState({
    //     numRows: 3
    //   })
    // } else {
    //   this.setState({
    //     numRows: 6
    //   })
    // }
    this.forceUpdate() // tmp fix
  }

  render() {
    return (
      <FlatList
        onLayout={this.layoutChange.bind(this)}
        data={this.state.items}
        renderItem={({item}) => (<Item
                                    data={item}
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
    top: state.top,
    searchResult: state.search,
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getTop: (options) => dispatch(top.fetchTop(options)),
    search: (name, options) => dispatch(search.fetchSearch(name, options)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {

  },
});
