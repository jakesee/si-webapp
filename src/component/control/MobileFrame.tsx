import React, { ReactNode } from "react";
import styled from "styled-components";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const PageWrapper = styled.div`
    flex: 1;

    display: flex;
    flex-direction: column;
`

const PageBody = styled.div`
    flex: 1 0 auto;
`

const PageFooter = styled.div`
    margin-top: auto;
    padding: 20px 10px 10px 10px;
    flex: 0 0 auto;
    min-height: 44px;

    display: flex;
    align-items: center;

`
const PoweredBy = styled.div`
    margin-left: auto;
`

const BackWrapper = styled.div`
    font-size: 1.4em;
    cursor: pointer;

    display: flex;
    align-items: center;
`

export interface MobileFrameProps {
    children?: ReactNode;
    onBack?: (e: any) => void;
    backLabel?: string;
}

export const MobileFrame = ({ children = undefined, onBack = undefined, backLabel = "Back" }: MobileFrameProps) => {

    return (
        <PageWrapper id="mobile-frame">
            <PageBody>
                { children }
            </PageBody>
            <PageFooter>
                {onBack && (<BackWrapper onClick={(e) => onBack(e)}><ArrowBackIosNewIcon /> <span>{backLabel}</span></BackWrapper>) }
                <PoweredBy>Powered by MyDoc</PoweredBy>
            </PageFooter>
        </PageWrapper>
    )
}
