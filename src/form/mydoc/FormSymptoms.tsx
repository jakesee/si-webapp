import React, { useContext, useState } from "react"
import styled from "styled-components";
import { DataContext } from "../../context/DataContext";
import { PageButton } from "../../page/mydoc/Page.styled";
import { FormNav } from "../Form.styles";


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
        margin-bottom: 20px;
    }
`


export interface FormSymptomsProps {
    onBack?: (e: any, step: number) => void;
    onNext: (e: any, step: number, data: any) => void;
    step: number;
}

export const FormSymptoms = ({ step, onNext, onBack = undefined }: FormSymptomsProps) => {

    const { theme } = useContext(DataContext);
    let [symptoms, setSymptoms] = useState("");
    let [duration, setDuration] = useState("");

    const next = (e: any) => {
        let data = { symptoms: symptoms, duration: duration }
        onNext(e, step, data)
    }

    const back = (e: any) => {
        onBack && onBack(e, step)
    }

    return (
        <Wrapper>
            <div className="question">
                <div>What are your symptoms?</div>
                <div><input type="text" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} /></div>
            </div>
            <div className="question">
                <div>How long did your symptoms last?</div>
                <div><input type="text" value={duration} onChange={(e) => setDuration(e.target.value)}/></div>
            </div>
            <FormNav>
                {onBack && <PageButton onClick={(e) => back(e)}>Back</PageButton>}
                <PageButton theme={theme} color="primary" onClick={(e) => next(e)} className="right">Next</PageButton>
            </FormNav>
        </Wrapper>
    )
}
