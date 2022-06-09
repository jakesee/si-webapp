import React, { useContext, useState } from "react"
import styled from "styled-components";
import { DataContext } from "../../context/DataContext";
import { PageButton } from "../../page/mydoc/Page.styled";
import { FormNav, FormTitle } from "../Form.styles";
import { FormProps } from "./Form";


const Wrapper = styled.div`
    padding: 20px;

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
        font-size: 1.4em;
        margin-bottom: 20px;
    }
`


export const FormSymptoms = ({ journey, onNext, onBack = undefined }: FormProps) => {

    const { theme } = useContext(DataContext);
    let [symptoms, setSymptoms] = useState("");
    let [duration, setDuration] = useState("");

    const next = (e: any) => {
        let triage = { symptoms: symptoms, duration: duration }
        journey.setTriage(triage)
        onNext(e)
    }

    return (
        <Wrapper>
            <FormTitle>How can I help you?</FormTitle>
            <div className="question">
                <div>What are your symptoms?</div>
                <div><input type="text" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} /></div>
            </div>
            <div className="question">
                <div>How long did your symptoms last?</div>
                <div><input type="text" value={duration} onChange={(e) => setDuration(e.target.value)}/></div>
            </div>
            <FormNav>
                {onBack && <PageButton onClick={(e) => onBack(e)}>Back</PageButton>}
                <PageButton theme={theme} color="primary" onClick={(e) => next(e)} className="right">Next</PageButton>
            </FormNav>
        </Wrapper>
    )
}
