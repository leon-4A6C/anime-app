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

import { favorites } from "../actions"
import { Item, SearchBar } from "../components"

class Home extends React.Component {

  state = {
      items: [],
      numRows: 3,
      limit: 0,
      sort: "",
      sorting: {},
      searchText: "",
      isSearch: false,
      show: 0, // same as limit but then for searches
      refreshing: false,
  }

  options = [
    {
      label: "all",
      option: {

      }
    }
  ]

  componentDidMount() {
    this.props.getFavorites();
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(JSON.stringify(prevProps.favorites.favorites) != JSON.stringify(this.props.favorites.favorites)) {

      const favs = [];
      for (var fav in this.props.favorites.favorites) {
        if (this.props.favorites.favorites.hasOwnProperty(fav)) {
          var element = this.props.favorites.favorites[fav];
          favs.push(element);
        }
      }

      this.setState({
        items: favs
      })
    }
  }
  

  searched() {
    
  }

  removeSearch() {

  }

  sortingList() {

  }

  optionsClick() {

  }

  layoutChange() {
    this.forceUpdate()
  }

  onRefresh() {

    this.setState({
      refreshing: true,
    });

    setTimeout(() => {
      this.setState({
        refreshing: false,
      })
    }, 250);
  }

  _itemPress(props, state) {
    const { navigate } = this.props.navigation;
    navigate("ItemInfo", {data: props.data});
  }

  _itemLongPress(props, state) {
    console.log("long press!")
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
        refreshControl={ (<RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh.bind(this)}/>)}
        keyExtractor={(x) => x.id}
        numColumns={3}
      />
    );
  }

}

function mapStateToProps(state) {
  return {
    favorites: state.favorites
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getFavorites: () => dispatch(favorites.getFavorites()),
    removeFavorite: (id) => dispatch(favorites.removeFavorite(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {

  },
});
