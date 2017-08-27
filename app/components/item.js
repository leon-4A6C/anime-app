import React from "react";
import {
  Image,
  TouchableNativeFeedback,
  StyleSheet,
  Platform,
  Dimensions
} from "react-native";

export default class home extends React.Component {

  _pressed() {
    // handle click and goto details page
    console.log("pressed: " + this.props.id + " #" + this.props.rank);
  }

  render() {
    return (
      <TouchableNativeFeedback
        onPress={this._pressed.bind(this)}
        background={TouchableNativeFeedback.SelectableBackground()}
        useForeground={true}
        style={styles.container}>
        <Image source={{uri: this.props.uri}} style={styles.image}/>
      </TouchableNativeFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
  },
  image: {
    width: Dimensions.get("window").width / 3,
    height: Dimensions.get("window").width / 3 * 1.5
  }
});
