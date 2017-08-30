import { StackNavigator, TabNavigator } from 'react-navigation';
import React from "react"
import {
  StyleSheet,
} from "react-native";

import { IconButton } from "./components"
import { Home, Details, Episodes, VideoPlayer } from "./screens"
import uiTheme from "./uiTheme"

const ItemInfo = TabNavigator({
  Details: { screen: Details },
  Episodes: { screen: Episodes },
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: uiTheme.text.fontSize,
    },
    tabStyle: {
         
    },
    style: {
      backgroundColor: uiTheme.palette.primaryDark,
    },
    indicatorStyle: {
      backgroundColor: uiTheme.palette.accentColor
    }
  }
});

// root
const App = StackNavigator({
  Home: { screen: Home },
  ItemInfo: { 
    screen: ItemInfo,
    navigationOptions: ({navigation}) => {
      const detailsParams = navigation.state.routes.find(x => x.routeName === "Details").params; // bit of a hack, but it works
      return {
        headerStyle: {
          backgroundColor: uiTheme.palette.primaryColor,
          height: uiTheme.toolbar.container.height
        },
        headerTintColor: uiTheme.palette.textColor,
        headerRight: (
          <IconButton
            size={30}
            iconPack="MaterialIcons"
            onPress={detailsParams.onFavPress} // the function lives in the details screen thingy
            iconStyle={styles.favIconStyle}
            style={styles.favStyle}
            name={detailsParams.star? "star" : "star-border"} />
        ),
      }
    }
  },
  VideoPlayer: {
    screen: VideoPlayer,
    navigationOptions: {
      header: null
    }
  }
});

const styles = StyleSheet.create({
  favIconStyle: {
    color: uiTheme.palette.textColor,
  },
  favStyle: {
    marginRight: 15
  }
});

export default App
