import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { render } from "react-dom";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { fetchAuthenticated } from "./actions/account";
import Root from "./components/Root";
import { Router, Switch, Route, BrowserRouter } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import AccountDragons from "./components/AccountDragons";
import "./index.css";

const history = createBrowserHistory();

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

store.dispatch(fetchAuthenticated()).then(() => {
  render(
    <Provider store={store}>
      <Root />
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Root} />

          <Route path="/account-dragons" component={AccountDragons} />
        </Switch>
      </Router>
    </Provider>,
    document.getElementById("root")
  );
});
