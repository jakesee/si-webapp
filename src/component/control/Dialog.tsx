import React, { ReactNode } from "react";
import styled from "styled-components";
import { ITheme } from "../../interfaces/ui";
import { FormButton } from "../common";


const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.54);

    display: flex;
    justify-items: center;
    align-items: center;
`

const Card = styled.div`

    margin: auto;
    background-color: white;
    border-radius: 3px;
    width: 60%;

    > div.title {
        padding: 15px 15px 10px 15px;
        font-size: 1.4em;
        font-weight: bold;

        border-bottom: 1px solid #eeeeee;
    }

    > div.content {
        padding: 10px 15px 10px 15px;
    }

    > div.control {
        padding: 15px;

        display: flex;
        gap: 5px;

        .right {
            margin-left: auto;
        }
    }
`

export interface DialogProps {
    children: ReactNode,
    title: string,
    onOK?: (e: any) => void,
    onCancel?: (e: any) => void,
    theme: ITheme
}

export const Dialog = ({ theme, children, title, onOK, onCancel}: DialogProps) => {

    return (
        <Wrapper>
            <Card>
                <div className="title">{ title}</div>
                <div className="content">{ children}</div>
                <div className="control">
                    {onCancel && <FormButton theme={theme} onClick={(e) => onCancel(e)}>Cancel</FormButton>}
                    {onOK && <FormButton theme={theme} color="primary" className="right" onClick={(e) => onOK(e)}>OK</FormButton>}
                </div>
            </Card>
        </Wrapper>
    )
}
