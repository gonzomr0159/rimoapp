import React from 'react';
import { useGoogleSheets } from './gapi';
import logo from './logo.svg';
import './App.css';

function App() {
  const data = useGoogleSheets();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {JSON.stringify(process.env.REACT_APP_G_CLIENT_ID)}
          {JSON.stringify(data)}
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
  );
}

export default App;
