import React, { ReactNode } from "react";
import styled from "styled-components";
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const Wrapper = styled.div`

    padding: 12px;
    background-color: #eeeeee;
    border-radius: 5px;
    margin-bottom: 20px;

    .infobox-header {
        padding: 3px 6px;
        margin-bottom: 10px;

        display: flex;
        align-items: start;
        gap: 5px;

        .infobox-icon {
            flex: 0 0 auto;
            font-size: 2em;

            display: flex;
            align-items: center;
        }

        .infobox-icon.warn {
            color: orange;
        }

        .infobox-icon.info {
            color: blue;
        }

        .infobox-icon.error {
            color: red;
        }

        .infobox-title {
            /* flex: 1 0 auto; */
        }
    }
`

export interface InfoBoxProps {
    title: ReactNode,
    type: "Warn" | "Info" | "Error",
    children?: ReactNode
}

export const InfoBox = ({title, type, children }: InfoBoxProps) => {
    return (
        <Wrapper>
            <div className="infobox-header">
                {type === "Info" && <div className="infobox-icon info"><InfoOutlinedIcon fontSize="inherit" /></div>}
                {type === "Warn" && <div className="infobox-icon warn"><WarningAmberOutlinedIcon fontSize="inherit" /></div>}
                {type === "Error" && <div className="infobox-icon error"><CancelOutlinedIcon fontSize="inherit" /></div>}
                <div className="infobox-title">{title}</div>
            </div>
            <div className="infobox-content">{children}</div>
        </Wrapper>
    )
}
