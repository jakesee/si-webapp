import React, { useContext } from "react"
import styled from "styled-components";
import { AppContext } from "../../../context/AppContext";
import { FormTitle, FormProps, FormButtonNav, FormButton, Section } from "../../common";


const Question = styled.div`
    margin-bottom: 20px;

    p {
        margin-bottom: 10px;
    }

    ul {
        margin-left: 10px;

        li {
            margin-left: 10px;
        }
    }
`

export const FormEmergency = ({ onNext, onBack = undefined }: FormProps<void, void>) => {

    const {theme} = useContext(AppContext)

    return (
        <Section>
            <FormTitle>Not for Emergency</FormTitle>
            <Question>
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
            </Question>
            <FormButtonNav>
                {onBack && <FormButton onClick={(e) => onBack(e)}>Back</FormButton>}
                <FormButton theme={theme} color="primary" onClick={(e) => onNext(e)} className="right">I agree</FormButton>
            </FormButtonNav>
        </Section>
    )
}
