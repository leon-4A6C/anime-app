import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import React from "react"
import {
  StyleSheet,
} from "react-native";

import { IconButton, SearchBar } from "./components"
import {
  Home,
  Details,
  Episodes,
  VideoPlayer,
  Settings,
  Favorites,
  Watched,
} from "./screens"
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

const HomeNavigator = TabNavigator({
  Home: { screen: Home },
  Favorites: { screen: Favorites },
  Watched: { screen: Watched },  
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
  },
  navigationOptions: ({navigation}) => {
    const params = navigation.state.params || {};
    return {
      header: (<SearchBar 
        onSearch={params.onSearched}
        onRemoveSearch={params.onRemoveSearch}
        onLeftElementPress={() => navigation.navigate("Settings")}
        onOptionsClick={params.onOptionsClick}
        options={params.options}
      />)
    }
  }
})

// root
const App = StackNavigator({
  Home: { screen: HomeNavigator },
  ItemInfo: { 
    screen: ItemInfo,
    navigationOptions: ({navigation}) => {
      const detailsParams = navigation.state.routes.find(x => x.routeName === "Details").params; // bit of a hack, but it works
      return {
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
  },
  Settings: {
    screen: Settings,
  }
}, {
  navigationOptions: ({navigation}) => { // default style for all the headers
    return {
      headerStyle: {
        backgroundColor: uiTheme.palette.primaryColor,
        height: uiTheme.toolbar.container.height
      },
      headerTintColor: uiTheme.palette.textColor,
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
