import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import { fetchGoogleSheet } from './gapi';

const clientId = process.env.REACT_APP_G_CLIENT_ID ?? '';

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: 'https://www.googleapis.com/auth/spreadsheets',
      }).then(() => console.log('init end'))
        .catch((e: any) => console.log('init failed', e));
    }
    gapi.load('client:auth2', initClient);
  });

  const onSuccess = async (res: any) => {
    fetchGoogleSheet(res.accessToken).then((data :any) => setData(data));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {JSON.stringify(data)}
        </p>
        <GoogleLogin
          clientId={clientId}
          onSuccess={onSuccess}
          scope={'https://www.googleapis.com/auth/spreadsheets'}
        />
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
