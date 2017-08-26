import React from 'react'
import { Provider } from "react-redux"

import App from "./app/app"
import store from "./app/store"

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
