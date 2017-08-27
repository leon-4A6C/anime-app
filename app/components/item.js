import React from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions
} from "react-native";

import uiTheme from "../uiTheme"

export default class home extends React.Component {

  _pressed() {
    // handle click and goto details page
    console.log("pressed: " + this.props.id + " #" + this.props.rank);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={this._pressed.bind(this)}
        style={styles.container}>
        <Image source={{uri: this.props.uri}} style={styles.image}/>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: uiTheme.palette.accentColor
  },
  image: {
    width: Dimensions.get("window").width / 3,
    height: Dimensions.get("window").width / 3 * 1.5
  }
});
