import React from "react";
import "./App.css";

import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/header/Header";
import Request from "./components/request/Request";

function App() {
  return (
    <div>
      <Request />
      <BrowserRouter>
        <Route exact path="/" component={Header} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </BrowserRouter>
    </div>
  );
}

export default App;
