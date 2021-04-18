import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { fetchAuthenticated } from "./actions/account";
import "./index.css";
import Root from "./components/Root";

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

store.dispatch(fetchAuthenticated()).then(() => {
  render(
    <Provider store={store}>
      <Root />
    </Provider>,
    document.getElementById("root")
  );
});
