import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import throttle from 'lodash/throttle';

import { createStore } from "redux";

import videosReducer from "./store/reducers/videos";
import { saveState, loadState } from "./localStorage";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const storedState = loadState('videorama');

const store = createStore(videosReducer, storedState);

store.subscribe(throttle(()=> {
  const updatedState = store.getState();
  saveState("videorama", updatedState);
}), 1000);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
