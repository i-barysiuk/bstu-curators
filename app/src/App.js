import React from 'react';
import logo from './logo.svg';
import './App.css';
import './components/menu/Menu'
import Menu from './components/menu/Menu';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (

    <div> 
       <Router>
        <Route  path="/"         component={Menu}/>
        <Route  path="/home"     component={Menu}/>
        <Route  path="/profil"   component={Menu}/>
        <Route  path="/groups"   component={Menu}/>
        <Route  path="/other"    component={Menu}/>
        <Route  path="/calendar" component={Menu}/>
        <Route  path="/reports"  component={Menu}/>
        <Route  path="/settings" component={Menu}/>
      </Router> 
    <div className="App">
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    </div>
  );
}

export default App;
