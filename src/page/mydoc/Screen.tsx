import React, { ReactElement } from "react";
import styled from "styled-components";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const PageWrapper = styled.div`
    /* height: ${window.innerHeight}px; */
    display: flex;
    flex-direction: column;
    flex: 1;
`

const PageBody = styled.div`
    flex: 1;
`

const PageFooter = styled.div`
    margin-top: auto;
    padding: 10px;
    flex: 0 0 auto;
    min-height: 44px;

    display: flex;

`
const PoweredBy = styled.div`
    font-size: 0.8em;
    margin-left: auto;
`

const BackWrapper = styled.div`
    display: flex;
    align-items: center;
`

export interface ScreenProps {
    children?: ReactElement | ReactElement[];
    onBack?: (e: any) => void;
    backLabel?: string;
}

export const Screen = ({ children = undefined, onBack = undefined, backLabel = "Back" }: ScreenProps) => {

    return (
        <PageWrapper>
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
