import React from "react";
import {
  View,
  StatusBar,
  StyleSheet
} from "react-native";

import { Search } from "../components"

export default class HomeScreen extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: "home",
  })

  render() {
    return (
      <View style={styles.container}>
        <Search/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
});
