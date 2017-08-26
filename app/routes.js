import { StackNavigator } from 'react-navigation';

import { HomeScreen } from "./screens"

const App = StackNavigator({
  Home: { screen: HomeScreen },
});

export default App
