import React, { ReactNode } from "react";
import styled from "styled-components";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const Wrapper = styled.div`

    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #cccccc;

    .header {
        cursor: pointer;
        padding: 10px;

        display: flex;
        align-items: center;

        .right {
            margin-left: auto;
        }
    }

    .contents {
        padding: 0 10px 10px 10px;
    }
`

export interface CollapsiblePanelProps {
    isCollapsed: boolean
    head?: ReactNode,
    children?: ReactNode,
    onChange?: (e: any, args: CollapsiblePanelEventArgs) => void
}

export interface CollapsiblePanelEventArgs {
    isCollapsing: boolean
}

export const CollapsiblePanel = ({ isCollapsed = true, head = "", children = undefined, onChange = undefined }: CollapsiblePanelProps) => {


    const onClick = (e: any) => {
        let args:CollapsiblePanelEventArgs = {
            isCollapsing: !isCollapsed
        }
        onChange && onChange(e, args);
    }

    return (
        <Wrapper className={isCollapsed ? "collapsed" : "expanded" }>
            <div className={isCollapsed ? "header collapsed" : "header expanded"} onClick={(e) => onClick(e)}>
                <span>{head}</span>
                {isCollapsed ? (<span className="right"><ExpandMoreIcon /></span>) : null }
                {!isCollapsed ? (<span className="right"><ExpandLessIcon /></span>) : null }
            </div>
            {!isCollapsed ? (<div className="contents">{children}</div>) : null }
            {/* <div className="contents">{children}</div> */}
        </Wrapper>
    )
}
