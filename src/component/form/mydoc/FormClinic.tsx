import React from "react";
import styled from "styled-components";
import { Section, FormTitle, FormProps, FormButtonNav } from "../../common";
import { IProvider } from "../../../interfaces/provider";

const ClinicGrid = styled.ul`
    margin: 0;
    display: flex;
    flex-direction: column;
`

const ClinicCell = styled.li`
    display: block;
    list-style: none;
    margin-bottom: 10px;
    border: 1px solid #cccccc;
    padding: 10px;
    width: 100%;
    cursor: pointer;
`

export const FormClinic = ({ input, theme, onNext, onBack }: FormProps<IProvider[], IProvider>) => {

    return (
        <Section>
            <FormTitle>Choose a Specialist Clinic</FormTitle>
            <ClinicGrid>
                {input?.map(clinic =>
                    <ClinicCell key={clinic.id} onClick={(e) => onNext(e, clinic)}>
                        <div className="name">{clinic.name}</div>
                    </ClinicCell>
                )}
            </ClinicGrid>
            <FormButtonNav>
                { onBack && <FormButtonNav theme={theme} onClick={(e) => onBack(e)}>Back</FormButtonNav> }
            </FormButtonNav>
        </Section>
    )
}
