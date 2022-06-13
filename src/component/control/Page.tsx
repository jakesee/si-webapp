import React, { ReactNode } from "react";
import styled from "styled-components";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { PageTitle } from "../common";

const Wrapper = styled.div`
    height: 100%;

    display: grid;
    grid-template-columns: auto;
    grid-template-rows: min-content 1fr min-content;
`

const Body = styled.div < { isScrollable: boolean }>`
    height: 100%;
    ${ props => !props.isScrollable ? `overflow: hidden;` : null }
`

const Footer = styled.div`
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

export interface PageProps {
    children?: ReactNode,
    title?: string,
    onBack?: (e: any) => void,
    backLabel?: string,
    isScrollable?: boolean,
}

export const Page = ({ title = "", children = undefined, onBack = undefined, backLabel = "Back", isScrollable = true }: PageProps) => {

    return (
        <Wrapper id="page">
            <PageTitle>{title}</PageTitle>
            <Body isScrollable={isScrollable}>
                { children }
            </Body>
            <Footer>
                {onBack && (<BackWrapper onClick={(e) => onBack(e)}><ArrowBackIosNewIcon /> <span>{backLabel}</span></BackWrapper>) }
                <PoweredBy>Powered by MyDoc</PoweredBy>
            </Footer>
        </Wrapper>
    )
}
