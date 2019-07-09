import React from 'react';
import logo from './logo.svg';
import './Login.css';

function Login() {
  return (
    <div className="Login">
      <header className="Login-header">
        <img src={logo} className="Login-logo" alt="logo" />
        <p>
          Edit <code>src/Login.js</code> and save to reload.
        </p>
        <a
          className="Login-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Login
        </a>
      </header>
    </div>
  );
}

export default Login;
