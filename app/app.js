import React from 'react'

import Routes from "./routes"

import { COLOR, ThemeProvider } from 'react-native-material-ui';

const uiTheme = {
  palette: {
    primaryColor: COLOR.teal700,
    accentColor: COLOR.bluegrey600
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Routes />
      </ThemeProvider>
    );
  }
}
