import React, { ReactElement, ReactNode, useState } from "react";
import styled from "styled-components";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Wrapper = styled.div`

    margin-bottom: 10px;
    transition: all 0.2s ease-out;

    .header {
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #cccccc;

        display: flex;
        align-items: center;
        .right {
            margin-left: auto;
        }
    }

    .header.collapsed {

    }
    .header.expanded {
        border-bottom: none;
        border-radius: 5px 5px 0 0;
    }
    .contents {
        border: 1px solid #cccccc;
        border-top: none;
    }
`

export interface CollapsiblePanelProps {
    isCollapsed: boolean
    label?: ReactNode,
    children?: ReactNode,
    onChange?: (e: any, args: CollapsiblePanelEventArgs) => void
}

export interface CollapsiblePanelEventArgs {
    isCollapsing: boolean
}

export const CollapsiblePanel = ({ isCollapsed = true, label = "", children = undefined, onChange = undefined }: CollapsiblePanelProps) => {


    const onClick = (e: any) => {
        let args:CollapsiblePanelEventArgs = {
            isCollapsing: !isCollapsed
        }
        onChange && onChange(e, args);
    }

    return (
        <Wrapper>
            <div className={isCollapsed ? "header collapsed" : "header expanded"} onClick={(e) => onClick(e)}>
                <span>{label}</span>
                {isCollapsed ? (<span className="right"><ExpandMoreIcon /></span>) : null }
                {!isCollapsed ? (<span className="right"><ExpandLessIcon /></span>) : null }
            </div>
            {!isCollapsed ? (<div className="contents">{children}</div>) : null }
        </Wrapper>
    )
}