import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import constants from "./util/constants";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter basename={constants.APP_CONTEXT}>
    <App />
  </BrowserRouter>,
  document.getElementById(constants.ROOT_ELEMENT_ID)
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
