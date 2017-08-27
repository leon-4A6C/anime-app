import { StackNavigator, TabNavigator } from 'react-navigation';

import { Home, Details, Episodes } from "./screens"
import uiTheme from "./uiTheme"

const ItemInfo = TabNavigator({
  Details: { screen: Details },
  Episodes: { screen: Episodes },
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: 14,
    },
    tabStyle: {
         
    },
    style: {
      backgroundColor: uiTheme.palette.primaryColor,
    },
    indicatorStyle: {
      backgroundColor: uiTheme.palette.accentColor
    },
    headerStyle: {
      backgroundColor: uiTheme.palette.primaryDark
    }
  }
});

// root
const App = StackNavigator({
  ItemInfo: { 
    screen: ItemInfo,
    navigationOptions: {
      headerStyle: {
        backgroundColor: uiTheme.palette.primaryLight,
        height: uiTheme.toolbar.container.height
      },
      headerTintColor: uiTheme.palette.textColor
    }
  },
  Home: { screen: Home },
});

export default App
