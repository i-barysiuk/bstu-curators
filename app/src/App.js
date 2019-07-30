import React from "react";
import "./App.css";
import { Router, Route } from "react-router-dom";
import Login from "./views/login/Login";
import Register from "./views/login/Login";
import Welcom from "./views/login/Login";
import Dashboard from "./views/dashboard/Dashboard";

import Request from "./components/request/Request";

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
          <Route exact path="/" component={Welcom} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={Request} />
        </Router>
      </Provider>
    );
  }
}

export default App;
