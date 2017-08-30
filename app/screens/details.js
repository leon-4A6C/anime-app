import React from "react"
import {
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native"
import { connect } from "react-redux"

import { details, favorites } from "../actions"
import uiTheme from "../uiTheme"
import { IconButton } from "../components"

class Details extends React.Component {

  state = {
    star: false,
  }

  static navigationOptions = ({navigation}) => ({
    title: "details",
  })

  componentDidMount() {
    const { state, setParams } = this.props.navigation;
    const data = state.params.data;
    this.props.getDetails(data.id);
    this.props.checkFavorite(data.id);
    setParams({
      onFavPress: this.favButtonPress.bind(this),
      star: false,
    });
  }

  favButtonPress() {
    const { favorites, navigation, setFavorites, getFavorites } = this.props;
    const data = navigation.state.params.data;
    if(this.state.star) {
      this.props.removeFavorite(data.id)
    } else {
      this.props.addFavorite(data)
    }
    this.setState({
      star: !this.state.star,
    })
  }

  componentDidUpdate(prevProps, prevState) {

    console.log(this.props.favorites)

    if(prevProps.favorites.check != this.props.favorites.check) {
      this.setState({
        star: this.props.favorites.check,
      })
    }

    if(this.state.star != this.props.navigation.state.params.star) {
      // update the navigation star icon
      this.props.navigation.setParams({
        star: this.state.star
      })
    }

  }
  
  

  render() {
    const { isFetching, details } = this.props.details;

    if(isFetching) {
      return (
        <ActivityIndicator style={styles.loader} size="large"/>
      )
    } else {
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.title}>{details.title}</Text>
          <ScrollView horizontal={true} pagingEnabled={true}>
            {/* add images(posters) here */}
          </ScrollView>
          <Text style={styles.synopsis}>{details.synopsis}</Text>
        </ScrollView>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  title: {
    fontSize: uiTheme.text.fontSize+4,
    fontWeight: "bold",
    marginBottom: 10,
  },
  synopsis: {
    fontSize: uiTheme.text.fontSize,
    marginBottom: 20
  },
  loader: {
    marginTop: 10
  },
  favIconStyle: {
    color: uiTheme.palette.textColor,
  },
  favStyle: {
    marginRight: 15
  }
});

function mapStateToProps(state) {
  return {
    details: state.details,
    favorites: state.favorites
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getDetails: (id) => dispatch(details.fetchDetails(id)),
    getFavorites: () => dispatch(favorites.getFavorites()),
    setFavorites: (data) => dispatch(favorites.setFavorites(data)),
    checkFavorite: (id) => dispatch(favorites.checkFavorite(id)),
    addFavorite: (item) => dispatch(favorites.addFavorite(item)),
    removeFavorite: (id) => dispatch(favorites.removeFavorite(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
