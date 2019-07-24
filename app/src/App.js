import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Menu from "./components/menu/Menu";
import { createBrowserHistory } from 'history';
import ReactGA from 'react-ga';
ReactGA.initialize("UA-144387777-1");

const history = createBrowserHistory();
history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});


function App() {
  return (
    <BrowserRouter history={history}>
      <Route exact path="/" component={Menu} />
      <Route path="/home" component={Menu} />
      <Route path="/users" component={Menu} />
      <Route path="/idcard" component={Menu} />
      <Route path="/file" component={Menu} />
      <Route path="/calendar" component={Menu} />
      <Route path="/search" component={Menu} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
    </BrowserRouter>
  );
}

export default App;
