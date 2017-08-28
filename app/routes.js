import { StackNavigator, TabNavigator } from 'react-navigation';

import { Home, Details, Episodes } from "./screens"
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
    navigationOptions: {
      headerStyle: {
        backgroundColor: uiTheme.palette.primaryColor,
        height: uiTheme.toolbar.container.height
      },
      headerTintColor: uiTheme.palette.textColor
    }
  },
});

export default App
