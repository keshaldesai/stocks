import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import registerServiceWorker from "./registerServiceWorker";
import "./styles/index.css";
import reducers from "./reducers";
import reduxPromise from "redux-promise";
import socketMiddleware from "./middleware/socketMiddleware";

const createStoreWithMiddleware = applyMiddleware(
  reduxPromise,
  socketMiddleware
)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
