import React from "react";
import {
  Image,
  TouchableHighlight,
  StyleSheet,
  Dimensions
} from "react-native";

import uiTheme from "../uiTheme"

export default class home extends React.Component {

  _press() {
    this.props.onPress(this.props, this.state);
  }
  
  _longPress() {
    this.props.onLongPress(this.props, this.state);
  }

  render() {
    const dim = Dimensions.get("window");
    return (
      <TouchableHighlight
        onPress={this._press.bind(this)}
        style={styles.container}
        onLongPress={this._longPress.bind(this)}
        >
        <Image source={{uri: this.props.uri}} style={{width: dim.width/3, height: dim.width/3*1.5}}/>
      </TouchableHighlight>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    
  },
});
