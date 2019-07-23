import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Menu from "./components/menu/Menu";

function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <Route exact path="/" component={Header} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/dashboard" component={Request} />
=======
      <Route exact path="/" component={Menu} />
      <Route path="/home" component={Menu} />
      <Route path="/users" component={Menu} />
      <Route path="/idcard" component={Menu} />
      <Route path="/file" component={Menu} />
      <Route path="/calendar" component={Menu} />
      <Route path="/search" component={Menu} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
>>>>>>> 96c38b724a5ff6bb98bce14e6d6faac1c324a4e8
    </BrowserRouter>
  );
}

export default App;
