import React, { useState } from "react"
import styled from "styled-components";
import { FormButtonNav, FormTitle, FormProps, FormButton, Section } from "../../common";


const Question = styled.div`

    margin-bottom: 20px;

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
`

export type IFormTriageQuestions = {
    animal: string,
    symptoms: string,
    duration: string,
    other: string,
}

export const FormTriage = ({ defaultValue = { animal: "", symptoms: "", duration: "", other: ""}, theme, onNext, onBack = undefined }: FormProps<void, IFormTriageQuestions>) => {

    let [symptoms, setSymptoms] = useState(defaultValue.symptoms ?? "");
    let [duration, setDuration] = useState(defaultValue.duration ?? "");
    let [animal, setAnimal] = useState(defaultValue.animal ?? "");
    let [other, setOther] = useState(defaultValue.other ?? "");

    const next = (e: any) => {
        let value = { animal, symptoms, duration, other }
        onNext(e, value);
    }

    return (
        <Section>
            <FormTitle>Medical Triage</FormTitle>
            <Question>
                <div><label>What kind of pet is it (e.g. type, species)?</label></div>
                <div><input type="text" value={animal} onChange={(e) => setAnimal(e.target.value)} placeholder="Dog, Poodle" /></div>
            </Question>
            <Question>
                <div><label>What are the symptoms?</label></div>
                <div><input type="text" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder="e.g. fatigue, hair loss, loss of appetite" /></div>
            </Question>
            <Question>
                <div><label>How long have the symptoms lasted?</label></div>
                <div><input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 2 days, 1 week"/></div>
            </Question>
            <Question>
                <div><label>Any other requests for the doctor?</label></div>
                <div><input type="text" value={other} onChange={(e) => setOther(e.target.value)} placeholder="e.g. I would like to..." /></div>
            </Question>
            <FormButtonNav>
                {onBack && <FormButton onClick={(e) => onBack(e)}>Back</FormButton>}
                <FormButton theme={theme} color="primary" onClick={(e) => next(e)} className="right">Next</FormButton>
            </FormButtonNav>
        </Section>
    )
}
