import React, { useContext } from "react"
import styled from "styled-components";
import { DataContext } from "../../context/DataContext";
import { PageButton } from "../../page/mydoc/Page.styled";
import { FormNav, FormTitle } from "../Form.styles";
import { FormProps } from "./Form";


const Wrapper = styled.div`
    padding: 20px;

    h1 {
        font-weight: bold;
        margin-bottom: 20px;
    }

    p {
        margin-bottom: 10px;
    }

    ul { margin-left: 10px; }
    ul li {
        margin-left: 10px;
    }

    div {
        margin-bottom: 10px;
    }

    input {
        border: none;
        border-bottom: 1px solid #000000;
        width: 100%;
        padding: 10px;
        outline: none;
    }

    .question {
        margin-bottom: 20px;
    }
`

export const FormEmergency = ({ journey, onNext, onBack = undefined }: FormProps) => {

    const {theme} = useContext(DataContext)

    const next = (e: any) => {
        onNext(e)
    }

    const back = (e: any) => {
        onBack && onBack(e)
    }

    return (
        <Wrapper>
            <FormTitle>Not for Emergency</FormTitle>
            <div className="question">
                <p>Video consultation is not available for symptoms that require immediate medical assistance.</p>
                <p>If you are experiencing such symptoms please consider calling ambulance service or visiting the nearest hospital. Such symptoms include but are not limited to the following:</p>
                <ul>
                    <li>Breathing difficulty or coughing up blood</li>
                    <li>Cheat pain or severe pain in other body parts</li>
                    <li>Choking</li>
                    <li>Confusion and/or hallucination</li>
                    <li>Fainting or loss of consciousness</li>
                    <li>Head or spine injury or broken bones</li>
                    <li>Seizures</li>
                    <li>Severe bleeding</li>
                    <li>Severe or persistent vomitting</li>
                    <li>Speech difficulty</li>
                    <li>Sudden dizziness, weakness or change in vision</li>
                    <li>Suicidal or homicidal thoughts</li>
                </ul>
            </div>
            <FormNav>
                {onBack && <PageButton onClick={(e) => back(e)}>Back</PageButton>}
                <PageButton theme={theme} color="primary" onClick={(e) => next(e)} className="right">Next</PageButton>
            </FormNav>
        </Wrapper>
    )
}
