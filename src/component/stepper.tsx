import React from "react";
import styled from "styled-components";

const Wrapper = styled.div<{ activeColor: string, inactiveColor: string}>`
    margin: auto;
    margin-bottom: 15px;

    text-align: center;

    .title {
        display: block;
        margin-bottom: 15px;
    }

    ul {
        display: flex;
        justify-content: center;
        gap: 10px;
    }

    li {
        display: inline-block;
        background-color: ${props => props.inactiveColor};
        width: 10px;
        height: 10px;
        border-radius: 10px;
    }

    li.current {
        background-color: ${props => props.activeColor};
    }
`


export interface StepperProps {
    totalSteps: number,
    currentStep: number,
    activeColor?: string,
    inactiveColor?: string
}


export const Stepper = ({ totalSteps = 3, currentStep = 0, activeColor = "lightblue", inactiveColor = "cornflowerblue" }: StepperProps) => {

    const getDots = () => {
        let dots = [];
        for (let i = 0; i < totalSteps; i++) {
            dots.push(<li key={i} className={i === currentStep ? 'current' : ''}>&nbsp;</li>)
        }
        return dots;
    }

    return (
        <Wrapper activeColor={activeColor} inactiveColor={inactiveColor}>
            <ul>{ getDots() }</ul>
        </Wrapper>
    )
}
