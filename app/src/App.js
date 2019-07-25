import React from "react";
import "./App.css";

import { BrowserRouter, Route } from "react-router-dom";
import Login from "./views/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/header/Header";
import Request from "./components/request/Request";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Header} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/dashboard" component={Request} />
    </BrowserRouter>
  );
}

export default App;
