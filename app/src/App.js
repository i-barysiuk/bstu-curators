import React from "react";
import "./App.css";
import { Router, Route } from "react-router-dom";
import Login from "./views/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Menu from "./components/menu/Menu";
import { createBrowserHistory } from "history";
import Analitic from "./helper/analitics";
import {Provider} from 'react-redux';
import store from './redux/store/store';

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
      <Provider store = {store}>
        <Router history={history}>
          <Route exact path="/" component={Menu} />
          <Route path="/home" component={Menu} />
          <Route path="/users" component={Menu} />
          <Route path="/idcard" component={Menu} />
          <Route path="/file" component={Menu} />
          <Route path="/calendar" component={Menu} />
          <Route path="/search" component={Menu} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
        </Router>
      </Provider>  
    );
  }
}

export default App;
