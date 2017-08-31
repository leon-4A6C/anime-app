import React from "react";
import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  FlatList,
  ToastAndroid,
  RefreshControl
} from "react-native";
import { connect } from "react-redux"

import { watched } from "../actions"
import { Item, SearchBar } from "../components"
import uiTheme from "../uiTheme"

class Home extends React.Component {

  state = {
      items: [],
      numRows: 3,
      sorting: {},
      searchText: "",
      isSearch: false,
      refreshing: false,
      searchResultsReturned: false,
  }

  options = [
    {
      label: "all",
      option: {

      }
    }
  ]

  componentDidMount() {
    this.props.getWatched();
    setTimeout(() => {
      this.props.navigation.setParams({
        options: this.options.map(x => x.label),
        onSearched: this.searched.bind(this),
        onRemoveSearch: this.removeSearch.bind(this),
        onOptionsClick: this.optionsClick.bind(this),
      });
    }, 25);
  }
  
  componentDidUpdate(prevProps, prevState) {

    const getItems = () => {
      const favs = [];
      for (var fav in this.props.watched.watched) {
        if (this.props.watched.watched.hasOwnProperty(fav)) {
          var element = this.props.watched.watched[fav];
          favs.push(element);
        }
      }
      return favs;
    }

    const resetItems = () => {
      this.setState({
        items: getItems()
      })
    }

    if(JSON.stringify(prevProps.watched.watched) != JSON.stringify(this.props.watched.watched)) {
      resetItems()
    }

    if(this.state.isSearch && !this.state.searchResultsReturned) {
      const items = getItems();
      const newItems = [];
      for(let item of items) {
        console.log(item.title)
        if(item.title.toLowerCase().indexOf(this.state.searchText.toLowerCase()) != -1) {
          newItems.push(item);
        }
      }
      console.log(newItems);
      this.setState({
        items: newItems,
        searchResultsReturned: true,
      })
    }

    if(prevState.isSearch && !this.state.isSearch) {
      resetItems()
    }

    if(prevProps.watched.isFetching && !this.props.watched.isFetching) {
      this.setState({
        refreshing: false,
      })
    }

  }
  

  searched(text) {
    this.setState({
      items: [],
      isSearch: true,
      searchText: text,
      searchResultsReturned: false,
    })
  }

  removeSearch() {
    this.setState({
      items: [],
      isSearch: false,
      searchText: "",
      searchResultsReturned: false,
    })
  }

  optionsClick() {
    console.log("clicked on option!")
  }

  layoutChange() {
    this.forceUpdate()
  }

  onRefresh() {

    this.setState({
      refreshing: true,
    })

    this.props.getWatched()

  }

  _itemPress(props, state) {
    const { navigate } = this.props.navigation;
    navigate("ItemInfo", {data: props.data});
  }

  _itemLongPress(props, state) {
    console.log("long press!")
  }

  render() {

    if(this.state.items.length == 0 && !this.props.watched.isFetching) {
      return (
        <FlatList
        onLayout={this.layoutChange.bind(this)}
        data={["bla"]}
        renderItem={({item}) => (
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>It's empty in here.</Text>
            <Text style={styles.text}>Go watch some anime damn it.</Text>
          </View>)}
        refreshControl={ (<RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}/>)}
        keyExtractor={(x) => x.id}
        numColumns={3}
      />
      )
    }

    return (
      <FlatList
        onLayout={this.layoutChange.bind(this)}
        data={this.state.items}
        renderItem={({item}) => (<Item
                                    data={item}
                                    onPress={this._itemPress.bind(this)}
                                    onLongPress={this._itemLongPress.bind(this)}/>)}
        refreshControl={ (<RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}/>)}
        keyExtractor={(x) => x.id}
        numColumns={3}
      />
    );
  }

}

const styles = StyleSheet.create({
  textContainer: {
    padding: 10,
    flex: 1
  },
  headerText: {
    fontWeight: "bold",
    fontSize: uiTheme.text.fontSize+6,
    textAlign: "center",
    marginBottom: 10,
  },
  text: {
    fontSize: uiTheme.text.fontSize,
    textAlign: "center",
  }
})


function mapStateToProps(state) {
  return {
    watched: state.watched
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getWatched: () => dispatch(watched.getWatched())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
