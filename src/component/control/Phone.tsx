import React, { ReactNode } from "react";
import styled from "styled-components";

import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import NetworkWifi3BarIcon from '@mui/icons-material/NetworkWifi3Bar';
import Battery2BarIcon from '@mui/icons-material/Battery2Bar';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;

  display: grid;
  grid-template-columns: auto;
  grid-template-rows: min-content min-content 1fr;

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

  div.webview {
    overflow-x: hidden;
    overflow-y: auto;
  }
`


export interface PhoneProps {
    children?: ReactNode
}

export const Phone = ({ children }: PhoneProps) => {
    return (
        <Wrapper>
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
                { children }
            </div>
        </Wrapper>
    )
}
