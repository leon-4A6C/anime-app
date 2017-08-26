import React from 'react'
import {
  Text,
  View,
} from 'react-native'
import { Provider } from "react-redux"

import App from "./app/app"
import store from "./app/store"

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App>default app</App>
      </Provider>
    );
  }
}
