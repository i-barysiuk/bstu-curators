import React from 'react';
import logo from './logo.svg';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="Dashboard">
      <header className="Dashboard-header">
        <img src={logo} className="Dashboard-logo" alt="logo" />
        <p>
          Edit <code>src/Dashboard.js</code> and save to reload.
        </p>
        <a
          className="Dashboard-link"
          href="https://vk.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Dashboard
        </a>
      </header>
    </div>
  );
}

export default Dashboard;
