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
        padding: 3px 0 3px 0;
        outline: none;
    }

    .question {
        margin-bottom: 20px;
    }
`


export const FormSymptoms = ({ journey, onNext, onBack = undefined }: FormProps) => {

    const { theme } = useContext(DataContext);
    let [symptoms, setSymptoms] = useState(journey.triage?.symptoms ?? "");
    let [duration, setDuration] = useState(journey.triage?.duration ?? "");
    let [animal, setAnimal] = useState(journey.triage?.animal ?? "");

    const next = (e: any) => {
        let triage = { animal: animal, symptoms: symptoms, duration: duration }
        journey.setTriage(triage)
        onNext(e)
    }

    return (
        <Wrapper>
            <FormTitle>Medical Triage</FormTitle>
            <div className="question">
                <div><label>What kind of pet is it (e.g. type, species)?</label></div>
                <div><input type="text" value={animal} onChange={(e) => setAnimal(e.target.value)} placeholder="Dog, Poodle" /></div>
            </div>
            <div className="question">
                <div><label>What are the symptoms?</label></div>
                <div><input type="text" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder="e.g. fatigue, hair loss, loss of appetite" /></div>
            </div>
            <div className="question">
                <div><label>How long have the symptoms lasted?</label></div>
                <div><input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 2 days, 1 week"/></div>
            </div>
            <FormNav>
                {onBack && <PageButton onClick={(e) => onBack(e)}>Back</PageButton>}
                <PageButton theme={theme} color="primary" onClick={(e) => next(e)} className="right">Next</PageButton>
            </FormNav>
        </Wrapper>
    )
}
