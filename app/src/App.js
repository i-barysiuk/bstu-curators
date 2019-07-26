import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./views/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Menu from "./components/menu/Menu";

function App() 
{
  return (
    <BrowserRouter>
      <Route exact path="/"    component={Menu} />
      <Route path="/login"     component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/dashboard" component={Request} />
    </BrowserRouter>
  );
}

export default App;
