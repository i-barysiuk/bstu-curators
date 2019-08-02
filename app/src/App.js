import React from "react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import Login from "./views/login/Login";
import Register from "./views/login/Login";
import Welcom from "./views/login/Login";
import Dashboard from "./views/dashboard/Dashboard";
import NotFound from './views/404/404';

import { createBrowserHistory } from "history";
import Analitic from "./helper/analitics";
import { Provider } from "react-redux";
import store from "./redux/store/store";

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
            <Route  exact path="/"         component={Welcom}    />
            <Route  exact path="/login"    component={Login}     />
            <Route  exact path="/register" component={Register}  />
            <Route  path="/dashboard"      component={Dashboard} />
            <Route                         component={NotFound}  />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
