import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import signUp from "./components/signUp/SignUp";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Menu from "./components/menu/Menu";
import Page from "./Page";

function App() {
  return (
    <BrowserRouter>
    <Route
  exact
  path="/"
  render={props => (
    <Page {...props} component={Menu} title="Menu" />
  )}
/>

<Route
  path="/home"
  render={props => (
    <Page {...props} component={Menu} title="Home page" />
  )}
/>
<Route
  exact
  path="/users"
  render={props => (
    <Page {...props} component={Menu} title="Users" />
  )}
/>

<Route
  path="/idcard"
  render={props => (
    <Page {...props} component={Menu} title="Cards" />
  )}
/>
<Route
  exact
  path="/file"
  render={props => (
    <Page {...props} component={Menu} title="Files" />
  )}
/>

<Route
  path="/calendar"
  render={props => (
    <Page {...props} component={Menu} title="Calendar" />
  )}
/>
<Route
  exact
  path="/search"
  render={props => (
    <Page {...props} component={Menu} title="Search" />
  )}
/>

<Route
  path="/login"
  render={props => (
    <Page {...props} component={Login} title="Login" />
  )}
/>
<Route
  exact
  path="/login"
  render={props => (
    <Page {...props} component={Menu} title="Login" />
  )}
/>

<Route
  path="/signUp"
  render={props => (
    <Page {...props} component={signUp} title="signUp" />
  )}
/>
<Route
  path="/dashboard"
  render={props => (
    <Page {...props} component={Dashboard} title="Dashboard" />
  )}
/>
    </BrowserRouter>
  );
}

export default App;
