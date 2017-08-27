import React from 'react'
import { COLOR, ThemeProvider } from 'react-native-material-ui';

import uiTheme from "./uiTheme"
import Routes from "./routes"

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Routes />
      </ThemeProvider>
    );
  }
}
