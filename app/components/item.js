import React from "react";
import {
  Image,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  View,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

import uiTheme from "../uiTheme"

export default class Item extends React.Component {
  
  state = {
    loading: true,
  }

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
        onLongPress={this._longPress.bind(this)}
        >
        <View style={{width: dim.width/3, height: dim.width/3*1.5}}>
          <View style={[styles.fullScreen, styles.middle]}>
            {this.state.loading ? <ActivityIndicator size="large"/> : null}
          </View>
          <Image
            onLoadEnd={() => this.setState({loading: false})}
            source={{uri: this.props.uri}} style={{width: dim.width/3, height: dim.width/3*1.5}}/>
        </View>
      </TouchableHighlight>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  middle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
});
