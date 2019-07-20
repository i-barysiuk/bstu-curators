import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import Header from './components/header/Header';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Header}/>
      <Route path="/login" component={Login}/>
      <Route path="/dashboard" component={Dashboard}/>
    </BrowserRouter>
  )
}

export default App;
