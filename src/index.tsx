import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import styled from 'styled-components';

import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import NetworkWifi3BarIcon from '@mui/icons-material/NetworkWifi3Bar';
import Battery2BarIcon from '@mui/icons-material/Battery2Bar';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const PhoneWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .system-tray {
    font-size: 1.2em;
    font-weight: bold;
    padding: 5px;

    display: flex;
    align-items: center;

    .icons {
      margin-left: auto;
    }
  }

  .app-title {
    color: #ffffff;
    background-color: #000000;
    padding: 10px;
  }

  .webview {
    flex: 1 0 auto;
  }
`


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PhoneWrapper>
      <div className="system-tray">
        <span>3:44pm</span>
        <span className="icons">
          <SignalCellularAltIcon fontSize="small" />
          <NetworkWifi3BarIcon fontSize="small" />
          <Battery2BarIcon fontSize="small" />
          <MailOutlineIcon fontSize="small" />
        </span>
      </div>
      <h1 className="app-title">Teleconsultation</h1>
      <div className="webview">
        <App />
      </div>
    </PhoneWrapper>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
