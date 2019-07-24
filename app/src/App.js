import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import SignIn from "./components/signIn/SignIn";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Menu from "./components/menu/Menu";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Menu} />
      <Route path="/home" component={Menu} />
      <Route path="/users" component={Menu} />
      <Route path="/idcard" component={Menu} />
      <Route path="/file" component={Menu} />
      <Route path="/calendar" component={Menu} />
      <Route path="/search" component={Menu} />
      <Route path="/login" component={Login} />
      <Route path="/signIn" component={SignIn} />
       <Route path="/dashboard" component={Dashboard} />
    </BrowserRouter>
  );
}

export default App;
