import React from "react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import Login from "./views/login/Login";
import Register from "./views/login/Login";
import Welcom from "./views/login/Login";
import Dashboard from "./views/dashboard/Dashboard";

import Request from "./components/request/Request";

import { createBrowserHistory } from "history";
import Analitic from "./helper/analitics";
import { Provider } from "react-redux";
import store from "./redux/store/store";

import PageWrapper from "./containers/pageWrapper/PageWrapper";

const history = createBrowserHistory();
history.listen(location => {
  Analitic.pageview(location.pathname);
});

class App extends React.Component {
  componentDidMount() {
    Analitic.pageview(window.location.pathname);
  }
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <PageWrapper {...props} title="Главная" component={Welcom} />
              )}
            />
            <Route
              path="/login"
              render={props => (
                <PageWrapper {...props} title="Вход" component={Login} />
              )}
            />
            <Route
              path="/register"
              render={props => (
                <PageWrapper
                  {...props}
                  title="Регистрация"
                  component={Register}
                />
              )}
            />
            <Route
              path="/dashboard"
              render={props => <PageWrapper {...props} component={Dashboard} />}
            />
            <Route
              path="*"
              exact
              render={props => (
                <PageWrapper {...props} title="Упс!" component={Request} />
              )}
            />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
